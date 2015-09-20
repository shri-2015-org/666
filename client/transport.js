import io from 'socket.io-client';

/* eslint dot-notation: 0 */
const log = window.console.log.bind(console, 'transport:');

const SOCKETHOST = process.env.SOCKETHOST || 'localhost';
const SOCKETPORT = process.env.SOCKETPORT || 3000;
const socket = io('http://' + SOCKETHOST + ':' + SOCKETPORT);
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
  socket.on('all:message', data => {
    log('On: message', data.data);
    store.dispatch(action(data.data));
  });
}

export function loginRes(store, action) {
  socket.on('login', data => {
    log('On: loginRes', data.data);
    _setUID(data.data.uid);
    store.dispatch(action(data.data));
  });
}

export const sendMessage = (text) => emit('message', { text });
export const loginReq = () => emit('login');

