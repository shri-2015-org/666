/* eslint no-console: 0 */
import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

// --- SOCKET SERVER

import routes from './routes';

const SOCKETHOST = process.env.SOCKETHOST || 'localhost';
const SOCKETPORT = process.env.SOCKETPORT || 3000;

const socketServer = new http.Server();
const io = socketIo(socketServer);

socketServer.listen(SOCKETPORT, () => {
  console.log('Socket data listening on ' + SOCKETHOST + ':' + SOCKETPORT);
});

io.on('connection', (socket) => {
  function err(error) {
    return {
      stat: 'ERROR',
      data: error || 'Undefined error',
    };
  }

  function handle(route, handler) {
    socket.on(route, (request) => {
      handler(request)
        .then((res) => {
          if (res.broadcast) {
            io.emit('all:' + route, res.response);
          }
          socket.emit(route, res.response);
        })
        .catch((error) => {
          socket.emit(route, err(error));
        });
    });
  }

  Object.keys(routes)
    .forEach((key) => handle(key, routes[key]));
});

// --- FILE AND HOT RELOAD SERVER

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { devConfig } from '../webpack.config.babel';

const FILEHOST = process.env.FILEHOST || 'localhost';
const FILEPORT = process.env.FILEPORT || 8080;
const FILEPATH = process.env.FILEPATH || '/../static';

const fileServer = new WebpackDevServer(webpack(devConfig), {
  publicPath: devConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {colors: true},
});

fileServer.use('/', express.static(__dirname + FILEPATH));
fileServer.listen(FILEPORT, FILEHOST, () => {
  console.log('FIle and hot reload server listening on ' + FILEHOST + ':' + FILEPORT);
});

