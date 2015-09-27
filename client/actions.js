export const NEW_MESSAGE = 'NEW_MESSAGE';
export const JOIN_USER = 'JOIN_USER';
export const LEAVE_USER = 'LEAVE_USER';
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const UPDATE_TOP_ROOMS = 'UPDATE_TOP_ROOMS';

export function joinUser({roomID, userID, avatar, nick}) {
  return {
    type: JOIN_USER,
    roomID,
    userID,
    user: {
      avatar,
      nick,
    },
  };
}

export function leaveUser({roomID, userID}) {
  return {
    type: LEAVE_USER,
    roomID,
    userID,
  };
}

export function updateTopRooms(rooms) {
  return {
    type: UPDATE_TOP_ROOMS,
    rooms,
  };
}

export function newMessage({roomID, userID, messageID, text, time}) {
  return {
    type: NEW_MESSAGE,
    roomID,
    message: {
      userID,
      messageID,
      text,
      time,
    },
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function toggleNavigation() {
  return {
    type: TOGGLE_NAVIGATION,
  };
}
