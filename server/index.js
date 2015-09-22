import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import _ from 'lodash';
import * as storage from './storage';

const app = express();
const httpServer = new http.Server(app);
const io = socketIO(httpServer);

const PORT = process.env.npm_package_config_serverPort || 3001;

app.use('/', express.static(__dirname + '/mock'));

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

httpServer.listen(PORT, function onListen() {
  console.log('listening on *:' + PORT);
});
