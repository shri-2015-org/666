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
    case action.UPDATE_TOP_ROOMS: return action.rooms;
    default: return state;
  }
}

function joinUser(state, action) {
  const {userID} = action;
  return {
    ...state,
    roomUsers: {
      ...state.roomUsers,
      [userID]: action.user,
    },
  };
}

function leaveUser(state, action) {
  const {userID} = action;
  const users = state.roomUsers;
  const newUsers = Object.assign({}, users);
  delete newUsers[userID];
  return {
    ...state,
    roomUsers: newUsers,
  };
}

function newMessage(state, action) {
  const { message } = action;
  const { messageID } = message;
  if (state.roomMessages[messageID]) {
    // TODO: handle existing message.
    return state;
  }
  return {
    ...state,
    // TODO: insert at correct time, not last in list.
    orderedMessages: [
      ...state.orderedMessages,
      messageID,
    ],
    roomMessages: {
      ...state.roomMessages,
      [messageID]: message,
    },
  };
}

function sentMessage(state, action) {
  // TODO: show the sent, but not yet confirmed message
  return state;
}

function confirmSentMessage(state, action) {
  // TODO: change the status of unconfirmed message
  return state;
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
    case actions.JOIN_USER: return insideRoom(action.roomID, joinUser);
    case actions.LEAVE_USER: return insideRoom(action.roomID, leaveUser);
    case actions.NEW_MESSAGE: return insideRoom(action.roomID, newMessage);
    case actions.SENT_MESSAGE: return insideRoom(action.roomID, sentMessage);

    case actions.CONFIRM_SENT_MESSAGE:
      return insideRoom(action.data.roomID, confirmSentMessage);

    case actions.REJECT_SENT_MESSAGE: {
      console.log(`Message rejected: ${action.description}`, action.message);
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
    default: return state;
  }
}

export default combineReducers({joinedRooms, topRooms, ui});

