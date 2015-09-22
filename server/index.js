/* eslint no-console: 0 */
import http from 'http';
import socketIO from 'socket.io';

import _ from 'lodash';
import * as storage from './storage';

import { transform } from 'babel-core';
transform('code', {
  plugins: ['node-env-inline'],
});

// --- SOCKET SERVER

const SOCKETPORT = process.env.SOCKETPORT || 3001;

const socketServer = new http.Server();
const io = socketIO(socketServer);

socketServer.listen(SOCKETPORT, () => {
  console.log('Socket data listening on *:' + SOCKETPORT);
});

io.on('connection', function onConnection(socket) {
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
});

// --- FILE SERVER

import devServer from './static.dev.js';
import prodServer from './static.prod.js';

if (process.env.NODE_ENV === 'development') {
  devServer();
} else {
  prodServer();
}

