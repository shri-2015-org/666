/* eslint no-console: 0 */
import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import _ from 'lodash';
import * as storage from './storage';

// --- SOCKET SERVER

const SOCKETHOST = process.env.SOCKETHOST || 'localhost';
const SOCKETPORT = process.env.SOCKETPORT || 3000;

const socketServer = new http.Server();
const io = socketIo(socketServer);

socketServer.listen(SOCKETPORT, () => {
  console.log('Socket data listening on ' + SOCKETHOST + ':' + SOCKETPORT);
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
    if (data && data.uid) {
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






import zzz from 'routes';

const OK = 'OK';
const ERR = 'ERROR';

function wrapper(stat, broadcast) {
  return (data) => {
    return {
      broadcast,
      response: { stat, data },
    };
  };
}

function readMessage(data) {
  // where is validation?
  return storage
    .readMessage(_.result(data, 'mid'))
    .then(wrapper(OK, false));
}

function sendMessage(data) {
  if (data && data.uid) {
    return storage
      .addUnreadMessage(data)
      .then(wrapper(OK, true));
  }
  return Promise
    .resolve('[uid] is not found')
    .then(wrapper(ERR, false));
}

function roomUser() {
  return storage
    .getRoomUser
    .then(wrapper(OK, false));
}

function login(data) {
  return storage
    .getUser(_.result(data, 'uid'))
    .then(wrapper(OK, true))
    .catch( () => {
      return storage
        .createUser()
        .then(wrapper(OK, true));
    });
}

function user(data) {
  return storage
    .getUser(_.result(data, 'uid'))
    .then(wrapper(OK, true));
}

const responces = {
  'readMessage': readMessage,
  'sendMessage': sendMessage,
  'roomUsers': roomUser,
  'login': login,
  'user': user,
};

// --- FILE AND HOT RELOAD SERVER

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { devConfig } from '../webpack.config.babel';

const FILEHOST = process.env.FILEHOST || 'localhost';
const FILEPORT = process.env.FILEPORT || 8080;
const FILEPATH = process.env.FILEPATH || '/../static';

const fileServer = new WebpackDevServer(webpack(devConfig), {
  publicPath: devConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {colors: true},
});

fileServer.use('/', express.static(__dirname + FILEPATH));
fileServer.listen(FILEPORT, FILEHOST, () => {
  console.log('FIle and hot reload server listening on ' + FILEHOST + ':' + FILEPORT);
});

