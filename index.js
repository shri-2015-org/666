import { spawn } from 'child_process';
import server from './server';
spawn(server);

import staticFs from 'node-static';
import http from 'http';
const file = new staticFs.Server('./client');

http.createServer( (request, response) => {
  request.addListener('end', () => {
    file.serve(request, response);
  }).resume();
}).listen(80);

