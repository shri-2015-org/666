var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var login = require('./login.js');

var PORT = 3001;

app.use('/', express.static(__dirname + '/static'));

io.on('connection', function(socket){
  socket.on('loginReq', function (data) {
    var user;
    if (data && data.uid && login.getUser(data.uid)) {
      user = login.getUser(data.uid);
    } else {
      user = login.createUser(socket.id);
    }
    socket.emit('loginRes', user);
    io.emit('newUser', user);
  });

  socket.on('sendMessage', function(data) {
    data.time = Date.now();
    io.emit('message', data);
  });

  socket.on('getUser', function(data) {
    socket.emit('user', login.getUser(data.uid));
  });

  socket.on('getRoomUsers', function(data) {
    socket.emit('roomUsers', login.getRoomUsers());
  });

});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
