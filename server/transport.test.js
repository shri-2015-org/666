/* eslint no-unused-vars: 0 */
import { assert, expect, should } from 'chai';
should(); // actually call the function

import dataServer from './transport.js';
import io from 'socket.io-client';

import config from '../config';

const socket = io('http://' + config.host + ':' + config.socket.port);

describe('Socket server test on port' + config.socket.port, () => {
  before( () => {
    dataServer(config.socket.port);
  });

  const mockRoomID = 'lobby';
  let identity1;
  let identity2;
  let randomRoomID;

  // --- topRooms

  it('get topRooms at begin', function init(done) {
    this.timeout(5000);
    socket.once('broadcast:topRooms', (res) => {
      res.should.have.property('rooms');
      // ...
      done();
    });
  });

  // --- joinRoom

  it('join existed room', (done) => {
    socket.once('server-response:joinRoom@0', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'OK');
      res.should.have.property('data');
      res.data.should.have.property('identity');
      res.data.should.have.property('room');
      // ...
      identity1 = res.data.identity;
      done();
    });
    socket.emit('client-request:joinRoom', {
      exchangeID: '0',
      data: {
        roomID: mockRoomID,
      },
    });
  });

  it('join random room', (done) => {
    socket.once('server-response:joinRoom@1', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'OK');
      res.should.have.property('data');
      res.data.should.have.property('identity');
      res.data.should.have.property('room');
      // ...
      identity2 = res.data.identity;
      randomRoomID = res.data.room.roomID;
      done();
    });
    socket.emit('client-request:joinRoom', {
      exchangeID: '1',
      data: {
        roomID: null,
      },
    });
  });

  it('join unknown room', (done) => {
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

  it('leave unknown room', (done) => {
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

  it('leave room with unknown user', (done) => {
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

  it('leave room with unknown secret', (done) => {
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
        userID: identity1.userID,
        secret: 'unknown-secret',
      },
    });
  });

  it('leave room -> ok', (done) => {
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
        userID: identity1.userID,
        secret: identity1.secret,
      },
    });
  });

  // --- message

  const messageText = 'Some message text';
  const messageTime = Date.now();

  it('message to unknown room', (done) => {
    socket.once('server-response:message@7', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'ERROR');
      res.should.have.property('description');
      // ...
      done();
    });
    socket.emit('client-request:message', {
      exchangeID: '7',
      data: {
        roomID: 'unknown-room-id',
        userID: 'unknown-user-id',
        secret: 'unknown-secret',
        text: messageText,
        time: messageTime,
      },
    });
  });

  it('message to room with unknown user', (done) => {
    socket.once('server-response:message@8', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'ERROR');
      res.should.have.property('description');
      // ...
      done();
    });
    socket.emit('client-request:message', {
      exchangeID: '8',
      data: {
        roomID: randomRoomID,
        userID: 'unknown-user-id',
        secret: 'unknown-secret',
        text: messageText,
        time: messageTime,
      },
    });
  });

  it('message to room with unknown secret', (done) => {
    socket.once('server-response:message@9', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'ERROR');
      res.should.have.property('description');
      // ...
      done();
    });
    socket.emit('client-request:message', {
      exchangeID: '9',
      data: {
        roomID: randomRoomID,
        userID: identity2.userID,
        secret: 'unknown-secret',
        text: messageText,
        time: messageTime,
      },
    });
  });

  it('message to room -> ok', (done) => {
    socket.once('server-response:message@10', (res) => {
      res.should.have.property('status');
      assert.equal(res.status, 'OK');
      res.should.have.property('data');
      res.data.should.have.property('text');
      assert.equal(res.data.text, messageText);
      res.data.should.have.property('time');
      assert.equal(res.data.time, messageTime);
      // ...
      done();
    });
    socket.emit('client-request:message', {
      exchangeID: '10',
      data: {
        roomID: randomRoomID,
        userID: identity2.userID,
        secret: identity2.secret,
        text: messageText,
        time: messageTime,
      },
    });
  });
});

