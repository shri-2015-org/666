(function init() {
  var socket = io();

  var getUID = function getUID() {
    console.log('getUID', localStorage.uid);
    return localStorage.uid;
  };

  var setUID = function setUID(uid) {
    console.log('setUID', uid);
    localStorage.uid = uid;
  };

  var onLogin = function onLogin(data) {
    setUID(data.uid);
  };

  var onMessage = function onMessage(data) {
    console.log('onMessage', data);
    $('#messages').append($('<li>').text(data.text));
  };

  var send = function send(text, uid) {
    socket.emit('sendMessage', {
      text: text,
      uid: uid,
    });
  };

  var getRoomUsers = function getRoomUsers() {
    socket.emit('getRoomUsers');
  };

  var login = function login() {
    socket.emit('loginReq', {uid: getUID()});
    getRoomUsers();
  };

  var onNewUser = function onNewUser(data) {
    console.log('onNewUser', data);
  };

  var roomUsers = function roomUsers(data) {
    console.log('roomUsers', data);
  };

  socket.on('loginRes', onLogin);

  socket.on('message', onMessage);

  socket.on('newUser', onNewUser);

  socket.on('roomUsers', roomUsers);

  $('form').submit( function submit() {
    send($('#m').val(), localStorage.uid);
    console.log('socket', socket);
    $('#m').val('');
    return false;
  });

  login();
})();

