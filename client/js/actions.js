export const SEND_MESSAGE = 'SEND_MESSAGE';
export const ADD_USER = 'ADD_USER';

export function sendMessage (text) {
  return {
    type: SEND_MESSAGE,
    text
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}
