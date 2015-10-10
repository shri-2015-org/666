export const NEW_MESSAGE = 'NEW_MESSAGE';
export const NEW_ATTACHMENT = 'NEW_ATTACHMENT';
export const JOIN_USER = 'JOIN_USER';
export const LEAVE_USER = 'LEAVE_USER';
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const TOGGLE_PREVIEW = 'TOGGLE_PREVIEW';
export const UPDATE_TOP_ROOMS = 'UPDATE_TOP_ROOMS';
export const CONFIRM_JOIN_ROOM = 'CONFIRM_JOIN_ROOM';
export const REJECT_JOIN_ROOM = 'REJECT_JOIN_ROOM';
export const SENT_MESSAGE = 'SENT_MESSAGE';
export const CONFIRM_SENT_MESSAGE = 'CONFIRM_SENT_MESSAGE';
export const REJECT_SENT_MESSAGE = 'REJECT_SENT_MESSAGE';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const SEARCH_INPUT_CHANGE = 'SEARCH_INPUT_CHANGE';
export const ROOM_INPUT_CHANGE = 'ROOM_INPUT_CHANGE';
export const SEARCH_RESULTS_UPDATE = 'SEARCH_RESULTS_UPDATE';
export const SEARCH_RESULTS_FAILED = 'SEARCH_RESULTS_FAILED';
export const CREATE_ROOM_FAILED = 'CREATE_ROOM_FAILED';
export const RESTORE_MESSAGES = 'RESTORE_MESSAGES';
export const JOINING_ROOM = 'JOINING_ROOM';

export function joiningRoom(roomID) {
  return {
    type: JOINING_ROOM,
    roomID,
  };
}

export function searchResultsUpdate(results) {
  return {
    type: SEARCH_RESULTS_UPDATE,
    results,
  };
}

export function createRoomFailed(description) {
  return {
    type: CREATE_ROOM_FAILED,
    description,
  };
}

export function searchResultsFailed(description) {
  return {
    type: SEARCH_RESULTS_FAILED,
    description,
  };
}

export function searchInputChange(text) {
  return {
    type: SEARCH_INPUT_CHANGE,
    text,
  };
}

export function roomInputChange(text) {
  return {
    type: ROOM_INPUT_CHANGE,
    text,
  };
}

export function leaveRoom(roomID) {
  return {
    type: LEAVE_ROOM,
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

export function newAttachment({roomID, messageID, url, meta, index}) {
  return {
    type: NEW_ATTACHMENT,
    roomID,
    messageID,
    url,
    index,
    meta,
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

export function togglePreview() {
  return {
    type: TOGGLE_PREVIEW,
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

export function confirmSentMessage(pendingID, {roomID, messageID, text}) {
  return {
    type: CONFIRM_SENT_MESSAGE,
    pendingID,
    roomID,
    text,
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

export function restoreMessages(roomID, {roomMessages, orderedMessages}) {
  return {
    type: RESTORE_MESSAGES,
    roomID,
    roomMessages,
    orderedMessages,
  };
}

