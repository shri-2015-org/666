/* eslint no-unused-vars: 0 */
import { assert, expect, should } from 'chai';
should(); // actually call the function

import dataServer from './transport.js';
import io from 'socket.io-client';

const port = 3002;
const socket = io('http://localhost:' + port);

describe('Socket server test on port' + port, () => {
  before( () => {
    dataServer(port);
  });

  // --- joinRoom

  it('join random room', function checklogin(done) {
    this.timeout(5000);
    socket.once('server-response:joinRoom@0', (res) => {
      res.should.have.property('status');
      res.should.have.property('data');
      res.data.should.have.property('identity');
      res.data.should.have.property('room');
      // ...
      done();
    });
    socket.emit('client-request:joinRoom', {
      exchangeID: '0',
      data: {
        roomID: null,
      },
    });
  });

  it('join existed room', function checklogin(done) {
    this.timeout(5000);
    socket.once('server-response:joinRoom@1', (res) => {
      res.should.have.property('status');
      res.should.have.property('data');
      res.data.should.have.property('identity');
      res.data.should.have.property('room');
      // ...
      done();
    });
    socket.emit('client-request:joinRoom', {
      exchangeID: '1',
      data: {
        roomID: '1289f58a-418d-4b6d-88e9-071418aa62e3',
      },
    });
  });

  it('join unknown room', function checklogin(done) {
    this.timeout(5000);
    socket.once('server-response:joinRoom@2', (res) => {
      res.should.have.property('status');
      res.should.have.property('description');
      // ...
      done();
    });
    socket.emit('client-request:joinRoom', {
      exchangeID: '2',
      data: {
        roomID: 'unknown-room-uuid',
      },
    });
  });
});

