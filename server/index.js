var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var login = require('./login.js');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', function(socket){
  socket.emit('login', login.createUser(socket.id));

  socket.on('sendMessage', function(data) {
    data.time = Date.now();
    io.emit('message', data);
  });

  socket.on('getUser', function(data) {
    socket.emit('user', data);
  });

});

http.listen(3001, function(){
  console.log('listening on *:3000');
});
