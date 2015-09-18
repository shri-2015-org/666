import { assert, expect, should } from 'chai';
should(); // actually call the function

import { exec } from 'child_process';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

describe('Server socket e2e test (server/index.test.js)', () => {
  let uid;

  before( () => {
    exec('npm run server', () => {});
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
      test: 'Some text message',
    });
  });

  after( () => {
    // fix process.kill() when use babel-node
    exec('pkill -f \'_babel-node server\'', () => {});
  });
});

