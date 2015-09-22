/* eslint no-console: 0 */
import socketServer from './socket.js';
import express from 'express';
import http from 'http';

import { transform } from 'babel-core';
transform('code', {
  plugins: ['node-env-inline'],
});

// --- SOCKET SERVER

socketServer();

// --- STATIC FILE  SERVER

const app = express();
const httpServer = new http.Server(app);

const PORT = process.env.PORT || 80;

app.use('/', express.static(__dirname + '/../static'));
httpServer.listen(PORT, () => {
  console.log('File server listening on *:' + PORT);
});

