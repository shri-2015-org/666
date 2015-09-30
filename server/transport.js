/* eslint no-console: 0 */
import http from 'http';
import socketIO from 'socket.io';

import _ from 'lodash';
import { delayAll } from './actions.delay';
import * as pureActions from './actions.mock';

const delay = Number(process.env.SERVER_DELAY);
const delayModifier = isNaN(delay) ? x => x : delayAll(delay);
const failureModifier = x => x;
console.log(pureActions);
const actions = _.compose(delayModifier, failureModifier)(pureActions);

const socketServer = new http.Server();
const io = socketIO(socketServer);

const handleError = (socket, responseEvent) => (err) => {
  socket.emit(responseEvent, {
    status: 'ERROR',
    description: err,
  });
};

const updateTop = () => {
  actions.getTop()
    .then((res) => {
      io.emit('broadcast:topRooms', res);
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
        updateTop();
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
        updateTop();
      })
      .catch(handleError(socket, responseEvent));
  });

  socket.on('client-request:message', ({ exchangeID, data }) => {
    const responseEvent = `server-response:message@${exchangeID}`;
    // TODO request validation here
    actions.message(data)
      .then((res) => {
        const { roomID } = res;
        const channel = `room:${roomID}`;

        socket.join(channel);
        socket.emit(responseEvent, {
          status: 'OK',
          data: res,
        });
        io.to(channel).emit('roomcast:message', res);
      })
      .catch(handleError(socket, responseEvent));
  });

  updateTop();
}

export default function(port) {
  socketServer.listen(port, () => {
    console.log('Socket data listening on *:' + port);
  });
  io.on('connection', onConnection);
}

