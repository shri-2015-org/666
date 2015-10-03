import http from 'http';
import socketIO from 'socket.io';

import pureActions from './mock/wrapper';

const socketServer = new http.Server();
const globalIO = socketIO(socketServer);

function createRoom(resEvents, res, socket) {
  socket.emit(resEvents.exchange, {
    status: 'OK',
  });
}

function joinRoom(resEvents, res, socket, io) {
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

function leaveRoom(resEvents, res, socket, io) {
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

function message(resEvents, res, socket, io) {
  const {roomID} = res;
  const channel = `room:${roomID}`;

  socket.emit(resEvents.exchange, {
    status: 'OK',
    data: res,
  });
  io.to(channel).emit(resEvents.roomcast, res);
}

function searchRoomID(resEvents, res, socket) {
  socket.emit(resEvents.exchange, {
    status: 'OK',
    data: res,
  });
}

const handlers = {
  createRoom,
  joinRoom,
  message,
  leaveRoom,
  searchRoomID,
};

const checkError = (event, request) => () => {
  let err = false;
  if (typeof request !== 'object') err = `${event}:request is not object`;
  if (typeof request.exchangeID !== 'string') err = `${event}:exchange is not string`;
  if (typeof request.data !== 'object') err = `${event}:data is not object`;
  if (err) return Promise.reject(err);
  return Promise.resolve();
};

const updateTop = (actions, io) => (data) => {
  if (!data || !data.needTop) return;
  actions.getTop()
    .then((res) => {
      io.emit('broadcast:topRooms', res);
    });
};

const errorHandler = (event, request, socket) => (err) => {
  const exchangeID = request && request.exchangeID ? request.exchangeID : 'error';

  socket.emit(`server-response:${event}@${exchangeID}`, {
    status: 'ERROR',
    description: err,
  });
};

const wrapper = (actions, socket, io) => (event) => {
  socket.on(`client-request:${event}`, (req) => {
    Promise.resolve()
      .then(checkError(event, req))
      .then(() => actions[event](req.data))
      .then((res) => {
        const resEvents = {
          exchange: `server-response:${event}@${req.exchangeID}`,
          roomcast: `roomcast:${event}`,
        };
        return handlers[event](resEvents, res, socket, io);
      })
      .then(updateTop(io))
      .catch(errorHandler(event, req, socket));
  });
};

export default function(port) {
  socketServer.listen(port, () => {
    console.log('Socket data listening on *:' + port);
  });
  globalIO.on('connection', (socket) => {
    Object.keys(handlers)
      .map(wrapper(pureActions, socket, globalIO));
    updateTop(pureActions, globalIO)({needTop: true});
  });
}

