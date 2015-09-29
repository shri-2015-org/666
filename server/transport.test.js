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

  const mockRoomID = '1289f58a-418d-4b6d-88e9-071418aa62e3';
  let identity;

  // --- joinRoom

  it('join random room', function checklogin(done) {
    this.timeout(5000);
    socket.once('server-response:joinRoom@0', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'OK');
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
      assert.equal(res.status, 'OK');
      res.should.have.property('data');
      res.data.should.have.property('identity');
      res.data.should.have.property('room');
      // ...
      identity = res.data.identity;
      done();
    });
    socket.emit('client-request:joinRoom', {
      exchangeID: '1',
      data: {
        roomID: mockRoomID,
      },
    });
  });

  it('join unknown room', function checklogin(done) {
    this.timeout(5000);
    socket.once('server-response:joinRoom@2', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'ERROR');
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

  // --- leaveRoom

  it('leave unknown room', function checklogin(done) {
    this.timeout(5000);
    socket.once('server-response:leaveRoom@3', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'ERROR');
      res.should.have.property('description');
      // ...
      done();
    });
    socket.emit('client-request:leaveRoom', {
      exchangeID: '3',
      data: {
        roomID: 'unknown-room-id',
        userID: 'unknown-user-id',
        secret: 'unknown-secret',
      },
    });
  });

  it('leave room with unknown user', function checklogin(done) {
    this.timeout(5000);
    socket.once('server-response:leaveRoom@4', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'ERROR');
      res.should.have.property('description');
      // ...
      done();
    });
    socket.emit('client-request:leaveRoom', {
      exchangeID: '4',
      data: {
        roomID: mockRoomID,
        userID: 'unknown-user-id',
        secret: 'unknown-secret',
      },
    });
  });

  it('leave room with unknown secret', function checklogin(done) {
    this.timeout(5000);
    socket.once('server-response:leaveRoom@5', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'ERROR');
      res.should.have.property('description');
      // ...
      done();
    });
    socket.emit('client-request:leaveRoom', {
      exchangeID: '5',
      data: {
        roomID: mockRoomID,
        userID: identity.userID,
        secret: 'unknown-secret',
      },
    });
  });

  it('leave room -> ok', function checklogin(done) {
    this.timeout(5000);
    socket.once('server-response:leaveRoom@6', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'OK');
      // ...
      done();
    });
    socket.emit('client-request:leaveRoom', {
      exchangeID: '6',
      data: {
        roomID: mockRoomID,
        userID: identity.userID,
        secret: identity.secret,
      },
    });
  });

  // --- message
  // TODO message
});

