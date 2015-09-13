import io from 'socket.io-client';
const socket = io('localhost:3001');

function _getUID() {
  return localStorage.user_uid;
}

export function addMessage(text) {
  console.log('Event: addMessage', text);
  socket.emit('sendMessage', {
    text: text,
    uid: _getUID(),
  });
}

