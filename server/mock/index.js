(function init() {
  var socket = io();

  function getUID() {
    console.log('getUID', localStorage.getItem('uid'));
    return localStorage.getItem('uid');
  }

  function setUID(uid) {
    console.log('setUID', uid);
    localStorage.setItem('uid', uid);
  }

  function onLogin(data) {
    setUID(data.uid);
  }

  function readMessage(data) {
    if (data && data.uid !== getUID()) {
      socket.emit('readMessage', data);
    }
  }

  function onMessage(data) {
    console.log('onMessage', data);
    readMessage(data);
    $('#messages').append($('<li>').text(data.text));
  }

  function send(text, uid) {
    socket.emit('sendMessage', {
      text: text,
      uid: uid,
    });
  }

  function getRoomUsers() {
    socket.emit('getRoomUsers');
  }

  function login() {
    socket.emit('loginReq', {uid: getUID()});
    getRoomUsers();
  }

  function onNewUser(data) {
    console.log('onNewUser', data);
  }

  function onRoomUsers(data) {
    console.log('onRoomUsers', data);
  }

  function onMessageRead (data) {
    console.log('onMessageRead', data);
  }

  socket.on('loginRes', onLogin);

  socket.on('message', onMessage);

  socket.on('newUser', onNewUser);

  socket.on('roomUsers', onRoomUsers);

  socket.on('messageRead', onMessageRead);

  $('form').submit( function submit() {
    send($('#m').val(), getUID());
    console.log('socket', socket);
    $('#m').val('');
    return false;
  });

  login();
})();

