import io from 'socket.io-client';

/* eslint dot-notation: 0 */
const log = window['console'].log.bind(console, 'transport:');
const socket = io('localhost:3001');
log('socket connection');

function _setUID(uid) {
  localStorage.setItem('user_uid', uid);
}

function _getUID() {
  return localStorage.getItem('user_uid');
}

function emit(type, data) {
  const sendData =  Object.assign({ uid: _getUID() }, data);

  log('Emit:', type, sendData);
  socket.emit(type, sendData);
}

export function onMessage(store, action) {
  socket.on('message', data => {
    log('On: message', data);
    store.dispatch(action(data));
  });
}

export function loginRes(store, action) {
  socket.on('loginRes', user => {
    log('On: loginRes', user);
    _setUID(user.uid);
    store.dispatch(action(user));
  });
}

export const sendMessage = (text) => emit('sendMessage', { text });
export const loginReq = () => emit('loginReq');

