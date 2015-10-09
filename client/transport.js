import io from 'socket.io-client';
import * as apiChecks from './api-checks';

/* eslint no-console: 0 */
const socket = io( window.location.hostname + ':' + DATAPORT );
const EXCHANGE_TIMEOUT = 3000;
console.log('transport: socket connection');

export function onTopRooms(handler) {
  socket.on('broadcast:topRooms', data => {
    if (apiChecks.topRooms(data)) {
      handler(data);
    }
  });
}

export function onMessage(handler) {
  socket.on('roomcast:message', data => {
    if (apiChecks.message(data)) {
      handler(data);
    }
  });
}

export function onAttachment(handler) {
  socket.on('roomcast:attachment', data => {
    if (apiChecks.attachment(data)) {
      handler(data);
    }
  });
}

export function onJoinUser(handler) {
  socket.on('roomcast:joinUser', data => {
    if (apiChecks.joinUser(data)) {
      handler(data);
    }
  });
}

export function onLeaveUser(handler) {
  socket.on('roomcast:leaveUser', data => {
    if (apiChecks.leaveUser(data)) {
      handler(data);
    }
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
      if (apiChecks.joinRoom(res)) {
        if (res.status === 'OK') {
          return resolve(res.data);
        }
        return reject(res.description);
      }
      return reject('API check has failed.');
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
      if (apiChecks.leaveRoom(res)) {
        if (res.status === 'OK') {
          return resolve(res.data);
        }
        return reject(res.description);
      }
      return reject('API check has failed.');
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
      if (apiChecks.messageExchange(res)) {
        if (res.status === 'OK') {
          return resolve(res.data);
        }
        return reject(res.description);
      }
      return reject('API check has failed.');
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
      if (apiChecks.searchRoomID(res)) {
        if (res.status === 'OK') {
          return resolve(res.data);
        }
        return reject(res.description);
      }
      return reject('API check has failed.');
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
      if (apiChecks.createRoom(res)) {
        if (res.status === 'OK') {
          return resolve();
        }
        return reject(res.description);
      }
      return reject('API check has failed.');
    });
    setTimeout(() => reject('createRoom timeout'), EXCHANGE_TIMEOUT);
  });
}

