import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import login from './login';

const app = express();
const httpServer = new http.Server(app);
const io = socketIO(httpServer);

const PORT = 3001;

app.use('/', express.static(__dirname + '/mock'));

io.on('connection', function onConnection(socket) {
  socket.on('loginReq', function onLoginReq(data) {
    data.uid = data && data.uid ? data.uid : (socket.id + Date.now());

    login.getUser(data.uid).then( function onGetUser(user) {
      if (user) {
        socket.emit('loginRes', user);
        io.emit('newUser', user);
      }
    }).catch( function createNewUser() {
      login.createUser(socket.id).then( function onCreateUser(user) {
        socket.emit('loginRes', user);
        io.emit('newUser', user);
      });
    });
  });

  socket.on('sendMessage', function onSendMessage(data) {
    data.time = Date.now();
    io.emit('message', data);
  });

  socket.on('getUser', function onGetUser(data) {
    login.getUser(data.uid).then( function sendUser(user) {
      socket.emit('user', user);
    });
  });

  socket.on('getRoomUsers', function onGetRoomUsers() {
    login.getRoomUsers().then( function sendRoomUsers(users) {
      socket.emit('roomUsers', users);
    });
  });
});

httpServer.listen(PORT, function onListen() {
  console.log('listening on *:' + PORT);
});
