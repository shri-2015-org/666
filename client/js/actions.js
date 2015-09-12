export const ADD_MESSAGE_PENDING = 'ADD_MESSAGE_PENDING';
export const ADD_MESSAGE_RECEIVED = 'ADD_MESSAGE_RECEIVED';
export const LOGIN = 'LOGIN';
export const ADD_USER = 'ADD_USER';

export function addMessagePending (text) {
  return {
    type: ADD_MESSAGE_PENDING,
    text,
  };
}
