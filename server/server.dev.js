/* eslint no-console: 0 */
import dataServer from './transport.js';
import express from 'express';
import http from 'http';

// --- DATA SERVER

dataServer(3001);

// --- DEV FILE AND HOT RELOAD SERVER

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import dev from '../webpack.config.babel';

const FILEPORT = 8080;
const FILEPATH = '/../static';

const fileServer = new WebpackDevServer(webpack(dev), {
  publicPath: dev.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {colors: true},
});

fileServer.use('/', express.static(__dirname + FILEPATH));
fileServer.listen(FILEPORT, () => {
  console.log('FIle and hot reload server listening on *:' + FILEPORT);
});

// --- MOCK FILE SERVER

const app = express();
const mockServer = new http.Server(app);

const MOCKPORT = 3000;

app.use('/', express.static(__dirname + '/mock'));
mockServer.listen(MOCKPORT, () => {
  console.log('Mock server listening on *:' + MOCKPORT);
});

