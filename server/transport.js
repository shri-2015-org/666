import http from 'http';
import socketIO from 'socket.io';

import actions from './mock/wrapper';
import * as handlers from './api.handlers';

const socketServer = new http.Server();
const io = socketIO(socketServer);

const checkError = (event, request) => () => {
  let err = false;
  if (typeof request !== 'object') err = `${event}:request is not object`;
  if (typeof request.exchangeID !== 'string') err = `${event}:exchange is not string`;
  if (typeof request.data !== 'object') err = `${event}:data is not object`;
  if (err) return Promise.reject(err);
  return Promise.resolve();
};

const updateTop = (data) => {
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

const wrapper = (socket) => (event) => {
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
      .then(updateTop)
      .catch(errorHandler(event, req, socket));
  });
};

export default function(port) {
  socketServer.listen(port, () => {
    console.log('Socket data listening on *:' + port);
  });
  io.on('connection', (socket) => {
    Object.keys(handlers)
      .map(wrapper(socket));
    updateTop({needTop: true});
  });
}

