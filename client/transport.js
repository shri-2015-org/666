import io from 'socket.io-client';

/* eslint no-console: 0 */
const socketUrl = window.location.hostname + ':' + (SOCKETPORT || '3001');
const socket = io(socketUrl);
console.log('transport: socket connection');

function _setUID(uid) {
  localStorage.setItem('user_uid', uid);
}

function _getUID() {
  return localStorage.getItem('user_uid');
}

function emit(type, data) {
  const sendData =  Object.assign({ uid: _getUID() }, data);

  console.log('transport: Emit:', type, sendData);
  socket.emit(type, sendData);
}

export function onMessage(store, action) {
  socket.on('message', data => {
    console.log('transport: On: message', data);
    store.dispatch(action(data));
  });
}

export function loginRes(store, action) {
  socket.on('loginRes', user => {
    console.log('transport: On: loginRes', user);
    _setUID(user.uid);
    store.dispatch(action(user));
  });
}

export const sendMessage = (text) => emit('sendMessage', { text });
export const loginReq = () => emit('loginReq');

