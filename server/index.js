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
      storage.createUser(socket.id + Date.now()).then( function onCreateUser(user) {
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

  socket.on('createRoom', function onGetRoom(data) {
    var date = new Date();
    storage.getRoom(_.result(data, 'rid')).then( function onGetRoom(room) {
        if (room) {
          io.emit('newRoom', room);
        }
      }).catch( function createNewRoom() {
        storage.createRoom(uuid.v4(), _.result(data, 'name'), +date, date.getDate() + 2).then( function onCreateRoom(room) {
          io.emit('newRoom', room);
        });
      });
  });

  /* Пол */
  socket.on('getRoom', function onGetRoom(data) {
    storage.getRoom(_.result(data, 'rid')).then( function sendRoom(room) {
      socket.emit('room', room);
    });
  });

  socket.on('getAllRooms', function onGetAllRooms() {
    storage.getAllRooms().then( function sendAllRooms() {
      socket.emit('allRooms', rooms);
    });
  });
});

httpServer.listen(PORT, function onListen() {
  console.log('listening on *:' + PORT);
});
