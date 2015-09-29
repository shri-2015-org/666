/* eslint no-console: 0 */
import http from 'http';
import socketIO from 'socket.io';

import _ from 'lodash';
import * as actions from './actions.mock';

const socketServer = new http.Server();
const io = socketIO(socketServer);

function onConnection(socket) {
  socket.on('client-request:joinRoom', ({ exchangeID, data }) => {
    const responseEvent = `server-response:joinRoom@${exchangeID}`;
    // request validation here ?
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
      .catch((err) => {
        socket.emit(responseEvent, {
          status: 'ERROR',
          description: err,
        });
      });
  });

  // TODO leaveRoom
  // TODO message
  // TODO delete below
/*
  socket.on('loginReq', function onLoginReq(data) {
    const uid = _.result(data, 'uid');

    storage.getUser(uid).then( function onGetUser(user) {
      if (user) {
        socket.emit('loginRes', user);
        io.emit('newUser', user);
      }
    }).catch( function createNewUser() {
      storage.createUser().then( function onCreateUser(user) {
        socket.emit('loginRes', user);
        io.emit('newUser', user);
      });
    });
  });

  socket.on('sendMessage', function onSendMessage(data) {
    if (data && data.uid && data.text) { // TODO обработка ошибок?
      storage.addUnreadMessage(data).then( function onAddUnreadMessage(message) {
        io.emit('message', message);
      });
    }
  });

  socket.on('readMessage', function onReadMessage(data) {
    storage.readMessage(_.result(data, 'mid')).then( function messageRead(message) {
      socket.emit('messageRead', message);
    });
  });

  socket.on('getUser', function onGetUser(data) {
    storage.getUser(_.result(data, 'uid')).then( function sendUser(user) {
      socket.emit('user', user);
    });
  });

  socket.on('getRoomUsers', function onGetRoomUsers() {
    storage.getRoomUsers().then( function sendRoomUsers(users) {
      socket.emit('roomUsers', users);
    });
  });
*/
}

export default function(port) {
  socketServer.listen(port, () => {
    console.log('Socket data listening on *:' + port);
  });
  io.on('connection', onConnection);
}

