/* eslint no-console: 0 */
import express from 'express';
import http from 'http';

// --- DEV FILE AND HOT RELOAD SERVER

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import dev from '../webpack.config.babel';

const FILEHOST = 'localhost';
const FILEPORT = 8080;
const FILEPATH = '/../static';

function execFileServer() {
  const fileServer = new WebpackDevServer(webpack(dev), {
    publicPath: dev.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {colors: true},
  });

  fileServer.use('/', express.static(__dirname + FILEPATH));
  fileServer.listen(FILEPORT, FILEHOST, () => {
    console.log('FIle and hot reload server listening on ' + FILEHOST + ':' + FILEPORT);
  });
}

// --- MOCK FILE SERVER

const app = express();
const mockServer = new http.Server(app);

const MOCKHOST = 'localhost';
const MOCKPORT = 3000;

function execMockServer() {
  app.use('/', express.static(__dirname + '/mock'));
  mockServer.listen(MOCKPORT, () => {
    console.log('Mock server listening on ' + MOCKHOST + ':' + MOCKPORT);
  });
}

// --- EXPORTS

export default () => {
  execFileServer();
  execMockServer();
};

