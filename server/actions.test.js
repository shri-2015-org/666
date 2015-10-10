import { assert } from 'chai';

import utils from './testUtils';

import * as actions from './actions';

let emptyData;
let data;
let onlyRoomID;

before( () => {
  emptyData = {};
  onlyRoomID = {
    roomID: 'roomID',
  };
  data = {
    roomID: 'roomID',
    userID: 'userID',
    secret: 'secret',
    text: 'text',
    time: 0,
  };
});

describe('actions', () => {
  describe('#createRoom({roomID})', () => {
    it('should reject if roomID === undefined', done => {
      actions.createRoom(emptyData)
        .catch(error => {
          assert.equal(error.name, 'ValidationError');
          done();
        });
    });
  });
  describe('#joinRoom({roomID})', () => {
    it('should reject if there is no room with tnis roomID', done => {
      actions.joinRoom(data)
        .catch(error => {
          assert.equal(error, 'Error: Can not find user in unexisted room');
          done();
        });
    });
    it('should resolve with new User', done => {
      actions.createRoom(data)
        .then(actions.joinRoom)
        .then( ({identity}) => {
          assert.equal(identity.roomID, 'roomID');
          done();
        });
    });
    it('should join to random room', done => {
      actions.createRoom(data)
        .then( () => {
          return actions.joinRoom(emptyData);
        })
        .then( ({identity}) => {
          assert.equal(identity.roomID, 'roomID');
          done();
        });
    });
    it('should restore user', done => {
      actions.createRoom(data)
        .then(actions.joinRoom)
        .then( ({identity}) => {
          return actions.joinRoom(identity);
        })
        .then( ({identity}) => {
          assert.equal(identity.roomID, 'roomID');
          done();
        });
    });
  });
  describe('#leaveRoom({roomID, userID, secret})', () => {
    it('should reject if user not found in room', done => {
      actions.leaveRoom(data)
        .catch(error => {
          assert.equal(error, 'Error: Can not find user in unexisted room');
          done();
        });
    });
    it('should resolve with {roomID, userID}', done => {
      actions.createRoom(data)
        .then(actions.joinRoom)
        .then( ({identity}) => {
          return actions.leaveRoom(identity);
        })
        .then(leaveData => {
          assert.equal(leaveData.roomID, 'roomID');
          done();
        });
    });
  });
  describe('#message({roomID, userID, secret, text, time})', () => {
    it('should reject if user not found in room', done => {
      actions.message(data)
        .catch(error => {
          assert.equal(error, 'Error: Can not find user in unexisted room');
          done();
        });
    });
    it('should resolve with {roomID, userID, secret, text, time}', done => {
      actions.createRoom(data)
        .then(actions.joinRoom)
        .then( ({identity}) => {
          const messageData = {
            roomID: identity.roomID,
            userID: identity.userID,
            secret: identity.secret,
            text: 'text',
            time: 0,
          };
          actions.message(messageData)
            .then( (msgData) => {
              assert.equal(msgData.data.roomID, messageData.roomID);
              assert.equal(msgData.data.userID, messageData.userID);
              assert.equal(msgData.data.text, messageData.text);
              assert.equal(msgData.data.time, messageData.time);
              done();
            });
        });
    });
  });
  describe('#getTop()', () => {
    it('should resolve with [rooms]', done => {
      actions.createRoom(data)
        .then( () => {
          actions.getTop()
            .then(topData => {
              assert.equal(topData.rooms.length, 1);
              done();
            });
        });
    });
  });
  describe('#searchRoomID({partialRoomID})', () => {
    it('should resolve with [rooms]', done => {
      actions.createRoom(data)
        .then( () => {
          actions.searchRoomID({partialRoomID: 'roo'})
            .then(rooms => {
              assert.equal(rooms.length, 1);
              done();
            });
        });
    });
  });
});
