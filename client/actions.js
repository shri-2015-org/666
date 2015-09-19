import * as transport from './transport.js';
import uuid from 'uuid';

export const MESSAGE = 'MESSAGE';
export const NEW_LOGIN = 'NEW_LOGIN';
export const ADD_USER = 'ADD_USER';

function _getUID() {
  return localStorage.getItem('user_uid');
}

function _addMessage(message) {
  return {
    type: MESSAGE,
    message,
  }
}

export function addMessagePending(text) {

  const message = {
    uid: _getUID(),
    mid: uuid.v4(),
    status: 'pending',
    text,
  };

  transport.sendMessage(message);

  return _addMessage(message);
}

export function addMessageReceived(message) {
  return _addMessage(message);
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

