/* eslint no-unused-vars: 0 */
import { assert, expect, should } from 'chai';
should(); // actually call the function

import socketServer from './socket.js';
import io from 'socket.io-client';

const port = 3002;
const socket = io('http://localhost:' + port);

describe('Socket server test on port' + port, () => {
  let uid;

  before( () => {
    socketServer(port);
  });

  it('get uid after ask', function checklogin(done) {
    this.timeout(5000);
    socket.once('loginRes', (data) => {
      data.should.have.property('uid');
      uid = data.uid;
      done();
    });
    socket.emit('loginReq', {});
  });

  it('get roomUsers after ask', function checkRoom(done) {
    this.timeout(5000);
    socket.once('roomUsers', (users) => {
      users.should.have.property(uid);
      done();
    });
    socket.emit('getRoomUsers', {});
  });

  it('get message after send it', function checkMessage(done) {
    this.timeout(5000);
    socket.on('message', (message) => {
      message.should.have.property('uid');
      done();
    });
    socket.emit('sendMessage', {
      uid: uid,
      text: 'Some text message',
    });
  });
});

