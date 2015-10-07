import http from 'http';
import socketIO from 'socket.io';

import { handlers, topRooms } from './api.handlers';

const socketServer = new http.Server();
const io = socketIO(socketServer);

const validate = (event, request) => () => {
  let err = false;
  if (typeof request !== 'object') err = `${event}:request is not object`;
  if (typeof request.exchangeID !== 'string') err = `${event}:exchange is not string`;
  if (typeof request.data !== 'object') err = `${event}:data is not object`;
  if (err) return Promise.reject(err);
  return Promise.resolve();
};

// TODO think about place it to inner
const errorHandler = (event, socket, request) => err => {
  const exchangeID = request && request.exchangeID ? request.exchangeID : 'error';

  socket.emit(`server-response:${event}@${exchangeID}`, {
    status: 'ERROR',
    description: err,
  });
};

const responser = (event, socket, request) => responses => {
  function switcher({type, channel, data}) {
    switch (type) {
      case 'exchange':
        return socket.emit(`server-response:${event}@${request.exchangeID}`, {
          status: 'OK',
          data,
        });
      case 'join':
        return io.join(channel);
      case 'leave':
        return io.leave(channel);
      case 'roomcast':
        return io.to(channel).emit(`roomcast:${event}`, data);
      case 'broadcast':
        return io.emit(`broadcast:${event}`, data);
      default:
        return null;
    }
  }

  return responses.map(response => {
    if (typeof response.then !== 'function') {
      return switcher(response);
    }
    return Promise.resolve(response).then(switcher);
  });
};

const wrapper = socket => event => {
  socket.on(`client-request:${event}`, request => {
    Promise.resolve()
      .then(validate(event, request))
      .then(handlers[event](request.data)) // it will be actions in future
      .then(responser(event, socket, request))
      .catch(errorHandler(event, socket, request));
  });
};

export default function(port) {
  socketServer.listen(port, () => {
    console.log('Socket data listening on *:' + port);
  });
  io.on('connection', (socket) => {
    Object.keys(handlers)
      .map(wrapper(socket));
    topRooms().then(response => {
      responser('topRooms')([response]);
    });
  });
}

