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
  const { messageID } = message;
  if (room.roomMessages[messageID]) {
    // TODO: handle existing message.
    return room;
  }
  return {
    ...room,
    // TODO: insert at correct time, not last in list.
    orderedMessages: [
      ...room.orderedMessages,
      messageID,
    ],
    roomMessages: {
      ...room.roomMessages,
      [messageID]: message,
    },
  };
}

function sentMessage(state, action) {
  // TODO: show the sent, but not yet confirmed message
  return state;
}

function confirmSentMessage(room, action) {
  // TODO: change the status of unconfirmed message
  return room;
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
    case actions.SENT_MESSAGE:
      return insideRoom(action.roomID, sentMessage);
    case actions.CONFIRM_SENT_MESSAGE:
      return insideRoom(action.roomID, confirmSentMessage);
    case actions.REJECT_SENT_MESSAGE: {
      console.log(`Message rejected: ${action.description}`, action.message);
      return state;
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
  currentRoomID: null,
};

/*
   ui: {
     navigationCollapsed: boolean,
     currentRoomID: string || null,
   }
*/
function ui(state = initialUi, action) {
  switch (action.type) {
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

