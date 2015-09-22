/* eslint no-console: 0 */
import express from 'express';
import http from 'http';

const app = express();
const httpServer = new http.Server(app);

const PORT = process.env.PORT || 80;

export function exec() {
  app.use('/', express.static(__dirname + '/static'));
  httpServer.listen(PORT, () => {
    console.log('File server listening on http://' + HOST + ':' + PORT);
  });
}

