import io from 'socket.io-client';

/* eslint no-console: 0 */
const socket = io( window.location.hostname + ':' + DATAPORT );
console.log('transport: socket connection');

function emit(type, data) {
  const sendData =  Object.assign({ uid: _getUID() }, data);

  console.log('transport: Emit:', type, sendData);
  socket.emit(type, sendData);
}

function assert(condition) {
  if (!condition) {
    throw new Error('Assertion failed!');
  }
}

export function onTopRooms(handler) {
  socket.on('broadcast:topRooms', data => {
    assert(data.rooms instanceof Array);
    data.rooms.forEach(room => {
      assert(typeof room.roomID === 'string');
      assert(typeof room.name === 'string');
      assert(typeof room.users === 'number');
      assert(typeof room.rating === 'number');
    });
    handler(data);
  });
}

export function onMessage(handler) {
  socket.on('roomcast:message', data => {
    assert(typeof data.roomID === 'string');
    assert(typeof data.userID === 'string');
    assert(typeof data.messageID === 'string');
    assert(typeof data.text === 'string');
    assert(typeof data.time === 'number');
    handler(data);
  });
}

export function onJoinUser(handler) {
  socket.on('roomcast:joinUser', data => {
    assert(typeof data.roomID === 'string');
    assert(typeof data.userID === 'string');
    assert(typeof data.avatar === 'string');
    assert(typeof data.nick === 'string');
    handler(data);
  });
}

export function onLeaveUser(handler) {
  socket.on('roomcast:leaveUser', data => {
    assert(typeof data.roomID === 'string');
    assert(typeof data.userID === 'string');
    handler(data);
  });
}


