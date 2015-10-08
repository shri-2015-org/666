import { combineReducers } from 'redux';
import * as actions from 'actions';

/*
  topRooms: [{
    roomID: string,
    name: string,
    users: number,
    rating: number,
  }] || null,
*/
function topRooms(state = null, action) {
  switch (action.type) {
    case actions.UPDATE_TOP_ROOMS: return action.rooms;
    default: return state;
  }
}

function joinUser(room, action) {
  const {userID} = action;
  return {
    ...room,
    roomUsers: {
      ...room.roomUsers,
      [userID]: action.user,
    },
  };
}

function leaveUser(room, action) {
  const {userID} = action;
  const users = room.roomUsers;
  const newUsers = Object.assign({}, users);
  delete newUsers[userID];
  return {
    ...room,
    roomUsers: newUsers,
  };
}

function newMessage(room, action) {
  const { message } = action;
  const userID = action.message.userID;
  const { messageID } = message;
  if (room.userID === userID) { // ignore our message
    return room;
  }
  return {
    ...room,
    // TODO: insert at correct time, not last in list.
    orderedMessages: [
      ...room.orderedMessages,
      messageID, // ! appended to the end.
    ],
    roomMessages: {
      ...room.roomMessages,
      [messageID]: {
        ...message,
        status: 'confirmed',
        index: room.orderedMessages.length, // ! appended to the end.
      },
    },
  };
}

function newAttachment(room, action) {
  const { messageID, meta, index, url } = action;
  const message = room.roomMessages[messageID];
  if (!message) {
    // TODO handle situation;
    console.log('newAttachment could not find the messageID: `${messageID}`');
  }
  const { attachments } = message;
  return {
    ...room,
    roomMessages: {
      ...room.roomMessages,
      [messageID]: {
        ...message,
        attachments: [
          ...attachments,
          { meta, index, url },
        ],
      },
    },
  };
}

function sentMessage(room, action) {
  const { text, time, pendingID } = action;
  const { userID } = room;
  const messageID = pendingID;
  const message = {
    userID,
    messageID,
    text,
    time,
    attachments: [],
  };
  return {
    ...room,
    orderedMessages: [
      ...room.orderedMessages,
      messageID, // ! appended to the end.
    ],
    roomMessages: {
      ...room.roomMessages,
      [messageID]: {
        ...message,
        status: 'sent',
        index: room.orderedMessages.length, // ! appended to the end.
      },
    },
  };
}

function confirmSentMessage(room, action) {
  const { pendingID, messageID, text } = action;
  const { roomMessages, orderedMessages } = room;
  const { index } = roomMessages[pendingID];

  // TODO переписать покрасивее (без мутирования промежуточных значений?)

  const newRoomMessages = (() => {
    const tmp = Object.assign({}, roomMessages);
    tmp[messageID] = {
      ...tmp[pendingID],
      status: 'confirmed',
      text,
      messageID,
    };
    delete tmp[pendingID];
    return tmp;
  })();

  const newOrderedMessages = (() => {
    const tmp = [ ...orderedMessages ];
    tmp[index] = messageID;
    return tmp;
  })();

  return {
    ...room,
    roomMessages: newRoomMessages,
    orderedMessages: newOrderedMessages,
  };
}

function rejectSentMessage(room, action) {
  const { pendingID } = action;
  const { roomMessages } = room;
  const message = roomMessages[pendingID];

  return {
    ...room,
    roomMessages: {
      ...roomMessages,
      [pendingID]: {
        ...message,
        status: 'rejected',
      },
    },
  };
}

/*
  joinedRooms: HashMap('roomID', {
    userID: string,
    secret: string,
    roomName: string,
    roomUsers: HashMap('userID', {
      avatar: string,
      nick: string,
    }),
    roomMessages: HashMap('messageID', {
      userID: string,
      messageID: string,
      text: string,
      time: number,
      index: number,
      status: 'sent' | 'confirmed' | 'rejected',
    })],
    orderedMessages: ['messageID'],
  });
*/
function joinedRooms(state = {}, action) {
  function insideRoom(roomID, reducer) {
    const room = state[roomID];
    if (!room) {
      console.log(`rooms ${action.type}: unexpected roomID "${roomID}"`);
      return state;
    }
    return {
      ...state,
      [roomID]: reducer(room, action),
    };
  }

  switch (action.type) {
    case actions.JOIN_USER:
      return insideRoom(action.roomID, joinUser);
    case actions.LEAVE_USER:
      return insideRoom(action.roomID, leaveUser);
    case actions.NEW_MESSAGE:
      return insideRoom(action.roomID, newMessage);
    case actions.NEW_ATTACHMENT:
      return insideRoom(action.roomID, newAttachment);
    case actions.SENT_MESSAGE:
      return insideRoom(action.roomID, sentMessage);
    case actions.CONFIRM_SENT_MESSAGE:
      return insideRoom(action.roomID, confirmSentMessage);
    case actions.REJECT_SENT_MESSAGE: {
      return insideRoom(action.roomID, rejectSentMessage);
    }
    case actions.RESTORE_MESSAGES: {
      const { roomID, roomMessages, orderedMessages } = action;
      return {
        ...state,
        [roomID]: {
          ...state[roomID],
          roomMessages,
          orderedMessages,
        },
      };
    }
    case actions.JOIN_ROOM:
      return state;
    case actions.LEAVE_ROOM: {
      const { roomID } = action;
      const newState = Object.assign({}, state);
      delete newState[roomID];
      return newState;
    }
    case actions.CONFIRM_JOIN_ROOM: {
      const { room, identity } = action;
      const { roomID } = room;
      const { userID, secret } = identity;
      const roomName = room.name;
      const roomUsers = room.users
        .reduce( (result, {userID: key, avatar, nick} ) => {
          return {
            ...result,
            [key]: {
              avatar,
              nick,
            },
          };
        }, {});

      return {
        ...state,
        [roomID]: {
          userID,
          secret,
          roomName,
          roomUsers,
          roomMessages: {},
          orderedMessages: [],
        },
      };
    }
    case actions.REJECT_JOIN_ROOM: {
      console.log(`Join room rejected: ${action.description}`);
      // TODO: show the error to user instead
      return state;
    }

    default: return state;
  }
}

const initialUi = {
  navigationCollapsed: false,
  previewCollapsed: true,
  currentRoomID: null,
  searchInputText: '',
  roomInputText: '',
  searchResults: null,
};

/*
   ui: {
     navigationCollapsed: boolean,
     previewCollapsed: boolean,
     currentRoomID: string || null,
     searchInputText: string,
     roomInputText: string,
     searchResults: null || [{
       roomID: string,
       name: string,
       users: number,
       rating: number,
     }],
   }
*/
function ui(state = initialUi, action) {
  switch (action.type) {
    case actions.CREATE_ROOM_FAILED: {
      // TODO handle it here.
      console.log('CREATE_ROOM_FAILED', action.description);
      return state;
    }
    case actions.SEARCH_RESULTS_FAILED: {
      // TODO indicate the failure to the user?
      return {
        ...state,
        searchResults: null,
      };
    }
    case actions.SEARCH_RESULTS_UPDATE: {
      return {
        ...state,
        searchResults: action.results,
      };
    }
    case actions.SEARCH_INPUT_CHANGE: {
      return {
        ...state,
        searchInputText: action.text,
      };
    }
    case actions.TOGGLE_PREVIEW: {
      return {
        ...state,
        previewCollapsed: !state.previewCollapsed,
      };
    }
    case actions.ROOM_INPUT_CHANGE: {
      return {
        ...state,
        roomInputText: action.text,
      };
    }
    case actions.TOGGLE_NAVIGATION: {
      return {
        ...state,
        navigationCollapsed: !state.navigationCollapsed,
      };
    }
    case actions.SWITCH_TO_JOINED_ROOM: {
      return {
        ...state,
        currentRoomID: action.roomID,
      };
    }
    case actions.LEAVE_ROOM: {
      if (state.currentRoomID !== action.roomID) return state;
      return {
        ...state,
        currentRoomID: null,
      };
    }
    default: return state;
  }
}

export default combineReducers({joinedRooms, topRooms, ui});

