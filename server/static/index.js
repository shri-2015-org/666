(function () {
  var socket = io();

  var getUID = function () {
    console.log('getUID', localStorage['uid']);
    return localStorage['uid'];
  };

  var setUID = function (uid) {
    console.log('setUID', uid);
    localStorage['uid'] = uid;
  };


  var onMessage = function (data) {
    console.log('onMessage', data);
    $('#messages').append($('<li>').text(data.text));
  };

  var send = function (text, uid) {
    socket.emit('sendMessage', {
      text: text,
      uid: uid
    });
  };

  var login = function () {
    socket.emit('loginReq', {uid: getUID()});
  };

  var getRoomUsers = function () {
    socket.emit('getRoomUsers');
  };

  var onNewUser = function (data) {
    console.log('onNewUser', data);
  };

  var roomUsers = function (data) {
    console.log('roomUsers', data);
  };

  socket.on('loginRes', onLogin);

  socket.on('message', onMessage);

  socket.on('newUser', onNewUser);

  socket.on('roomUsers', roomUsers);

  $('form').submit(function () {
    send($('#m').val(), localStorage['uid']);
    console.log('socket', socket);
    $('#m').val('');
    return false;
  });

  login();

})();
