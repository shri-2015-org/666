/* eslint no-console: 0 */
import dataServer from './transport.js';
import express from 'express';
import http from 'http';

import config from '../config';

import { transform } from 'babel-core';
transform('code', {
  plugins: ['node-env-inline'],
});


// --- DATA SERVER

dataServer(config.socket.port);

// --- STATIC FILE SERVER

const app = express();
const httpServer = new http.Server(app);

app.use('/', express.static(__dirname + '/../static'));
httpServer.listen(config.port, () => {
  console.log('File server listening on *:' + config.port);
});

