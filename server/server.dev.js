/* eslint no-console: 0 */
import dataServer from './transport.js';
import express from 'express';

import config from '../config';

// --- DATA SERVER

dataServer(config.socket.port);

// --- DEV FILE AND HOT RELOAD SERVER

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import dev from '../webpack.config.babel';

const fileServer = new WebpackDevServer(webpack(dev), {
  publicPath: dev.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunkModules: false,
  },
});

fileServer.use('/', express.static(__dirname + '/../static'));
fileServer.listen(config.port, () => {
  console.log('File and hot reload server listening on ' + config.host + ':' + config.port);
});

