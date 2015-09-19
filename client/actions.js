export const ADD_MESSAGE_PENDING = 'ADD_MESSAGE_PENDING';
export const ADD_MESSAGE_RECEIVED = 'ADD_MESSAGE_RECEIVED';
export const NEW_LOGIN = 'NEW_LOGIN';
export const ADD_USER = 'ADD_USER';
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';

export function addMessagePending(text) {
  return {
    type: ADD_MESSAGE_PENDING,
    text,
  };
}

export function addMessageReceived(message) {
  return {
    type: ADD_MESSAGE_RECEIVED,
    message,
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function newLogin(login) {
  return {
    type: NEW_LOGIN,
    login,
  };
}

export function toggleNavigation() {
  return {
    type: TOGGLE_NAVIGATION,
  };
}
