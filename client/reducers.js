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
  return {
    ...state,
    roomMessages: [
      ...state.roomMessages,
      action.message,
    ],
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
    roomMessages:[{
      userID: string,
      messageID: string,
      text: string,
      time: number,
    }]
  });
*/
function joinedRooms(state = {}, action) {
  function callReducer(reducer) {
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
    case actions.JOIN_USER: return callReducer(joinUser);
    case actions.LEAVE_USER: return callReducer(leaveUser);
    case actions.NEW_MESSAGE: return callReducer(newMessage);
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
