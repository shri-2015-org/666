/* eslint no-console: 0 */
import http from 'http';
import socketIO from 'socket.io';

import _ from 'lodash';
import * as actions from './actions.mock';

const socketServer = new http.Server();
const io = socketIO(socketServer);

const handleError = (socket, responseEvent) => (err) => {
  socket.emit(responseEvent, {
    status: 'ERROR',
    description: err,
  });
};

function onConnection(socket) {
  socket.on('client-request:joinRoom', ({ exchangeID, data }) => {
    const responseEvent = `server-response:joinRoom@${exchangeID}`;
    // TODO request validation here
    actions.joinRoom(data)
      .then((res) => {
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
      })
      .catch(handleError(socket, responseEvent));
  });

  socket.on('client-request:leaveRoom', ({ exchangeID, data }) => {
    const responseEvent = `server-response:leaveRoom@${exchangeID}`;
    // TODO request validation here
    actions.leaveRoom(data)
      .then(({roomID, userID}) => {
        const channel = `room:${roomID}`;

        socket.leave(channel);
        socket.emit(responseEvent, {
          status: 'OK',
        });
        io.to(channel).emit('roomcast:leaveUser', {
          roomID,
          userID,
        });
      })
      .catch(handleError(socket, responseEvent));
  });

  socket.on('client-request:message', ({ exchangeID, data }) => {
    const responseEvent = `server-response:message@${exchangeID}`;
    // TODO request validation here
    actions.message(data)
      .then((res) => {
        const { roomID } = res.room;
        const channel = `room:${roomID}`;

        socket.join(channel);
        socket.emit(responseEvent, {
          status: 'OK',
          data: res,
        });
        io.to(channel).emit('roomcast:joinUser', res);
      })
      .catch(handleError(socket, responseEvent));
  });
}

export default function(port) {
  socketServer.listen(port, () => {
    console.log('Socket data listening on *:' + port);
  });
  io.on('connection', onConnection);
}

