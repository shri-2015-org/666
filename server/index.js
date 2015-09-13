var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var login = require('./login.js');

var PORT = 3001;

app.use('/', express.static(__dirname + '/static'));

io.on('connection', function(socket) {
  socket.on('loginReq', function(data) {
    data.uid = data && data.uid ? data.uid : (socket.id + Date.now());

    login.getUser(data.uid).then( function(user) {
      if (user) {
        socket.emit('loginRes', user);
        io.emit('newUser', user);
      }
    }).catch( function() {
      login.createUser(socket.id).then( function(user) {
        socket.emit('loginRes', user);
        io.emit('newUser', user);
      });
    });
  });

  socket.on('sendMessage', function(data) {
    data.time = Date.now();
    io.emit('message', data);
  });

  socket.on('getUser', function(data) {
    login.getUser(data.uid).then( function(user) {
      socket.emit('user', user);
    });
  });

  socket.on('getRoomUsers', function(data) {
    login.getRoomUsers().then( function(users) {
      socket.emit('roomUsers', users);
    });
  });
});

http.listen(PORT, function() {
  console.log('listening on *:' + PORT);
});
