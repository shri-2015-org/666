import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import utils from './utils';
import login from './login';

const app = express();
const httpServer = new http.Server(app);
const io = socketIO(httpServer);

const PORT = 3001;
const messages = [];

app.use('/', express.static(__dirname + '/mock'));

io.on('connection', function onConnection(socket) {
  socket.on('loginReq', function onLoginReq(data) {
    let uid;
    if (data && data.uid) {
      uid = data.uid;
    }

    login.getUser(uid).then( function onGetUser(user) {
      if (user) {
        socket.emit('loginRes', user);
        io.emit('newUser', user);
      }
    }).catch( function createNewUser() {
      login.createUser(socket.id + Date.now()).then( function onCreateUser(user) {
        socket.emit('loginRes', user);
        io.emit('newUser', user);
      });
    });
  });

  socket.on('sendMessage', function onSendMessage(data) {
    if (data && data.uid) {
      data.time = Date.now();
      data.mid = data.uid + Date.now();
      messages.push(data.mid);
      console.log(messages);
      io.emit('message', data);
    }
  });

  socket.on('readMessage', function onReadMessage(data) {
    if (data && data.mid) {
      utils.removeFromArray(data.mid, messages);
      console.log(messages);
    }
  });

  socket.on('getUser', function onGetUser(data) {
    if (data && data.uid) {
      login.getUser(data.uid).then( function sendUser(user) {
        socket.emit('user', user);
      });
    }
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
