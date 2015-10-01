export const NEW_MESSAGE = 'NEW_MESSAGE';
export const JOIN_USER = 'JOIN_USER';
export const LEAVE_USER = 'LEAVE_USER';
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const UPDATE_TOP_ROOMS = 'UPDATE_TOP_ROOMS';
export const JOIN_ROOM = 'JOIN_ROOM';
export const CONFIRM_JOIN_ROOM = 'CONFIRM_JOIN_ROOM';
export const REJECT_JOIN_ROOM = 'REJECT_JOIN_ROOM';
export const SENT_MESSAGE = 'SENT_MESSAGE';
export const CONFIRM_SENT_MESSAGE = 'CONFIRM_SENT_MESSAGE';
export const REJECT_SENT_MESSAGE = 'REJECT_SENT_MESSAGE';
export const SWITCH_TO_JOINED_ROOM = 'SWITCH_TO_JOINED_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const SEARCH_INPUT_CHANGE = 'SEARCH_INPUT_CHANGE';

export function searchInputChange(text) {
  return {
    type: SEARCH_INPUT_CHANGE,
    text,
  };
}

export function leaveRoom(roomID) {
  return {
    type: LEAVE_ROOM,
    roomID,
  }
}

export function switchToJoinedRoom(roomID) {
  return {
    type: SWITCH_TO_JOINED_ROOM,
    roomID,
  };
}

export function joinRoom(roomID) {
  return {
    type: JOIN_ROOM,
    roomID,
  };
}

export function confirmJoinRoom({identity, room}) {
  return {
    type: CONFIRM_JOIN_ROOM,
    identity,
    room,
  };
}

export function rejectJoinRoom(description) {
  return {
    type: REJECT_JOIN_ROOM,
    description,
  };
}

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

export function sentMessage(pendingID, {roomID, text, time}) {
  return {
    type: SENT_MESSAGE,
    pendingID,
    roomID,
    text,
    time,
  };
}

export function confirmSentMessage(pendingID, {roomID, messageID}) {
  return {
    type: CONFIRM_SENT_MESSAGE,
    pendingID,
    roomID,
    messageID,
  };
}

export function rejectSentMessage(pendingID, roomID, description) {
  return {
    type: REJECT_SENT_MESSAGE,
    pendingID,
    roomID,
    description,
  };
}

