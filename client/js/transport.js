import io from 'socket.io-client';

const socket = io('localhost:3001');
console.log('socket connection');

function _setUID(uid) {
  localStorage['user_uid'] = uid;
}

function _getUID() {
  return localStorage['user_uid'];
}

function emit(type, data) {
  const sendData =  Object.assign({ uid: _getUID() }, data);

  console.log('Emit:', type, sendData);
  socket.emit(type, sendData);
}

export function onMessage(store, action) {
  socket.on('message', data => {
    console.log('On: message', data);
    store.dispatch(action(data));
  });
}

export function loginRes(store, action) {
  socket.on('loginRes', user => {
    console.log('On: loginRes', user);
    _setUID(user.uid);
    store.dispatch(action(user));
  });
}

export const sendMessage = (text) => emit('sendMessage', { text });
export const loginReq = () => emit('loginReq');

/*
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};
*/
