import io from 'socket.io-client';

/* eslint no-console: 0 */
const socket = io( window.location.hostname + ':' + DATAPORT );
const EXCHANGE_TIMEOUT = 3000;
console.log('transport: socket connection');

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

let exchangeCount = 0;
function getExchangeID() {
  return String(exchangeCount++);
}

export function joinRoom({roomID, userID, secret}) {
  const exchangeID = getExchangeID();
  socket.emit('client-request:joinRoom', {
    exchangeID,
    data: {
      roomID,
      userID,
      secret,
    },
  });

  return new Promise( (resolve, reject) => {
    socket.once(`server-response:joinRoom@${exchangeID}`, res => {
      assert(res instanceof Object);
      if (res.status === 'OK') {
        assert(res.data instanceof Object);
        assert(res.data.identity instanceof Object);
        assert(typeof res.data.identity.userID === 'string');
        assert(typeof res.data.identity.avatar === 'string');
        assert(typeof res.data.identity.nick === 'string');
        assert(typeof res.data.identity.secret === 'string');
        assert(res.data.room instanceof Object);
        assert(typeof res.data.room.roomID === 'string');
        assert(typeof res.data.room.name === 'string');
        assert(res.data.room.users instanceof Array);
        res.data.room.users.forEach(user => {
          assert(typeof user.roomID === 'string');
          assert(typeof user.userID === 'string');
          assert(typeof user.avatar === 'string');
          assert(typeof user.nick === 'string');
        });
        return resolve(res.data);
      }
      assert(res.status === 'ERROR');
      assert(typeof res.description === 'string');
      return reject(res.description);
    });
    setTimeout(() => reject('joinRoom timeout'), EXCHANGE_TIMEOUT);
  });
}

export function leaveRoom({roomID, userID, secret}) {
  const exchangeID = getExchangeID();
  socket.emit('client-request:leaveRoom', {
    exchangeID,
    data: {
      roomID,
      userID,
      secret,
    },
  });

  return new Promise( (resolve, reject) => {
    socket.once(`server-response:leaveRoom@${exchangeID}`, res => {
      assert(res instanceof Object);
      if (res.status === 'OK') {
        return resolve();
      }
      assert(res.status === 'ERROR');
      assert(typeof res.description === 'string');
      return reject(res.description);
    });
    setTimeout(() => reject('leaveRoom timeout'), EXCHANGE_TIMEOUT);
  });
}

export function message({roomID, userID, secret, text, time}) {
  const exchangeID = getExchangeID();
  socket.emit('client-request:message', {
    exchangeID,
    data: {
      roomID,
      userID,
      secret,
      text,
      time,
    },
  });

  return new Promise( (resolve, reject) => {
    socket.once(`server-response:message@${exchangeID}`, res => {
      assert(res instanceof Object);
      if (res.status === 'OK') {
        assert(res.data instanceof Object);
        assert(typeof res.data.roomID === 'string');
        assert(typeof res.data.userID === 'string');
        assert(typeof res.data.messageID === 'string');
        assert(typeof res.data.text === 'string');
        assert(typeof res.data.time === 'number');
        return resolve(res.data);
      }
      assert(res.status === 'ERROR');
      assert(typeof res.description === 'string');
      return reject(res.description);
    });
    setTimeout(() => reject('message timeout'), EXCHANGE_TIMEOUT);
  });
}

export function searchRoomID(partialRoomID) {
  const exchangeID = getExchangeID();
  socket.emit('client-request:searchRoomID', {
    exchangeID,
    data: {
      partialRoomID,
    },
  });

  return new Promise( (resolve, reject) => {
    socket.once(`server-response:searchRoomID@${exchangeID}`, res => {
      assert(res instanceof Object);
      if (res.status === 'OK') {
        assert(res.data instanceof Array);
        res.data.forEach(room => {
          assert(room instanceof Object);
          assert(typeof room.roomID === 'string');
          assert(typeof room.name   === 'string');
          assert(typeof room.users  === 'number');
          assert(typeof room.rating === 'number');
        });
        return resolve(res.data);
      }
      assert(res.status === 'ERROR');
      assert(typeof res.description === 'string');
      return reject(res.description);
    });
    setTimeout(() => reject('searchRoomID timeout'), EXCHANGE_TIMEOUT);
  });
}

// TODO много повторяющегося кода в каждом из обработчиков; можно вынести его.
export function createRoom(roomID) {
  const exchangeID = getExchangeID();
  socket.emit('client-request:createRoom', {
    exchangeID,
    data: {
      roomID,
    },
  });

  return new Promise( (resolve, reject) => {
    socket.once(`server-response:createRoom@${exchangeID}`, res => {
      assert(res instanceof Object);
      if (res.status === 'OK') {
        return resolve();
      }
      assert(res.status === 'ERROR');
      assert(typeof res.description === 'string');
      return reject(res.description);
    });
    setTimeout(() => reject('createRoom timeout'), EXCHANGE_TIMEOUT);
  });
}

