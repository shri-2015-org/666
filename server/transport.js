/* eslint no-console: 0 */
import http from 'http';
import socketIO from 'socket.io';

import actions from './mock/wrapper';

const socketServer = new http.Server();
const io = socketIO(socketServer);

const updateTop = () => {
  actions.getTop()
    .then((res) => {
      io.emit('broadcast:topRooms', res);
    });
};

function check(socket, name, handler) {
  let responseEvent = `server-response:${name}@error`;
  socket.on(`client-request:${name}`, request => {
    return new Promise((resolve, reject) => {
      if (typeof request !== 'object') return reject('request is not object');

      const {exchangeID, data} = request;
      if (typeof exchangeID !== 'string') return reject('exchange is not string');

      responseEvent = `server-response:${name}@${exchangeID}`;
      if (typeof data !== 'object') return reject('data is not object');

      return actions[name](data)
        .then(resolve)
        .catch(reject);
    })
    .then((res) => {
      handler(responseEvent, res);
    })
    .catch((err) => {
      socket.emit(responseEvent, {
        status: 'ERROR',
        description: err,
      });
    });
  });
}

function onConnection(socket) {
  check(socket, 'joinRoom', (responseEvent, res) => {
    const { roomID } = res.room;
    const { userID, nick, avatar } = res.identity;
    const channel = `room:${roomID}`;

    socket.join(channel);
    socket.emit(responseEvent, {
      status: 'OK',
      data: res,
    });
    io.to(channel).emit('roomcast:joinUser', {
      roomID,
      userID,
      nick,
      avatar,
    });
    updateTop();
  });

  check(socket, 'leaveRoom', (responseEvent, {roomID, userID}) => {
    const channel = `room:${roomID}`;

    socket.leave(channel);
    socket.emit(responseEvent, {
      status: 'OK',
    });
    io.to(channel).emit('roomcast:leaveUser', {
      roomID,
      userID,
    });
    updateTop();
  });

  check(socket, 'message', (responseEvent, res) => {
    const {roomID} = res;
    const channel = `room:${roomID}`;

    socket.emit(responseEvent, {
      status: 'OK',
      data: res,
    });
    io.to(channel).emit('roomcast:message', res);
  });

  check(socket, 'searchRoomID', (responseEvent, res) => {
    socket.emit(responseEvent, {
      status: 'OK',
      data: res,
    });
  });

  check(socket, 'createRoom', (responseEvent) => {
    socket.emit(responseEvent, {
      status: 'OK',
    });
  });

  updateTop();
}

export default function(port) {
  socketServer.listen(port, () => {
    console.log('Socket data listening on *:' + port);
  });
  io.on('connection', onConnection);
}

