export function createRoom(resEvents, res, socket) {
  socket.emit(resEvents.exchange, {
    status: 'OK',
  });
}

export function joinRoom(resEvents, res, socket, io) {
  const { roomID } = res.room;
  const { userID, nick, avatar } = res.identity;
  const channel = `room:${roomID}`;

  socket.join(channel);
  socket.emit(resEvents.exchange, {
    status: 'OK',
    data: res,
  });
  io.to(channel).emit(resEvents.roomcast, {
    roomID,
    userID,
    nick,
    avatar,
  });
  return {needTop: true};
}

export function leaveRoom(resEvents, res, socket, io) {
  const {roomID, userID} = res;
  const channel = `room:${roomID}`;

  socket.leave(channel);
  socket.emit(resEvents.exchange, {
    status: 'OK',
  });
  io.to(channel).emit(resEvents.roomcast, {
    roomID,
    userID,
  });
  return {needTop: true};
}

export function message(resEvents, res, socket, io) {
  const {roomID} = res;
  const channel = `room:${roomID}`;

  socket.emit(resEvents.exchange, {
    status: 'OK',
    data: res,
  });
  io.to(channel).emit(resEvents.roomcast, res);
}

export function searchRoomID(resEvents, res, socket) {
  socket.emit(resEvents.exchange, {
    status: 'OK',
    data: res,
  });
}

