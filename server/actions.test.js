import { assert, should, expect } from 'chai';

import * as actions from './actions';
import * as ERRORS from '../common/ERRORS';

const roomID = '1289f58a-418d-4b6d-88e9-071418aa62e3';
const userID = '8cc4dc0b-8263-49d7-90dd-15551913462d';
const secret = '48cdbbb9-5e8a-403f-9104-e5ed66019a41';

describe('actions', () => {
  describe('#joinRoom(data)', () => {
    it('should reject if data === undefined', done => {
      actions.joinRoom()
        .catch(error => {
          assert.equal(error, ERRORS.API.JOIN_ROOM.EMPTY_DATA);
          done();
        });
    });

    it('should reject if data.roomID === undefined', done => {
      actions.joinRoom({})
        .catch(error => {
          assert.equal(error, ERRORS.API.JOIN_ROOM.EMPTY_ROOM_ID);
          done();
        });
    });

    it('should reject if data.roomID is not a string', done => {
      actions.joinRoom({roomID: 123})
        .catch(error => {
          assert.equal(error, ERRORS.API.JOIN_ROOM.INVALID_ROOM_ID);
          done();
        });
    });

    it('should reject if room does not exist', done => {
      actions.joinRoom({roomID: 'some defunct roomID'})
        .catch(error => {
          assert.equal(error, ERRORS.API.JOIN_ROOM.DEFUNCT_ROOM);
          done();
        });
    });

    it('should resolve user with properties roomID(string), userID(string), nick(string), avatar(string)', done => {
      actions.joinRoom({roomID: roomID})
        .then(data => {
          assert.property(data, 'roomID');
          assert.property(data, 'userID');
          assert.property(data, 'nick');
          assert.property(data, 'avatar');
          assert.isString(data.roomID);
          assert.isString(data.userID);
          assert.isString(data.nick);
          assert.isString(data.avatar);
          done();
        });
    });

    it('should resolve user.roomID === data.roomID', done => {
      actions.joinRoom({roomID: roomID})
        .then(data => {
          assert.equal(data.roomID, roomID);
          done();
        });
    });
  });

  describe('#leaveRoom(data)', () => {
    it('should reject if data === undefined', done => {
      actions.leaveRoom()
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.EMPTY_DATA);
          done();
        });
    });

    it('should reject if data.roomID === undefined', done => {
      actions.leaveRoom({})
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.EMPTY_ROOM_ID);
          done();
        });
    });

    it('should reject if data.userID === undefined', done => {
      actions.leaveRoom({roomID: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.EMPTY_USER_ID);
          done();
        });
    });

    it('should reject if data.secret === undefined', done => {
      actions.leaveRoom({roomID: '', userID: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.EMPTY_SECRET);
          done();
        });
    });

    it('should reject if data.roomID is not a string', done => {
      actions.leaveRoom({roomID: 123, userID: '', secret: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.INVALID_ROOM_ID);
          done();
        });
    });

    it('should reject if data.userID is not a string', done => {
      actions.leaveRoom({roomID: '', userID: 123, secret: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.INVALID_USER_ID);
          done();
        });
    });

    it('should reject if data.secret is not a string', done => {
      actions.leaveRoom({roomID: '', userID: '', secret: 123})
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.INVALID_SECRET);
          done();
        });
    });

    it('should reject if room does not exist', done => {
      actions.leaveRoom({roomID: 'some defunct roomID', userID: '', secret: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.DEFUNCT_ROOM);
          done();
        });
    });

    it('should reject if user does not exist', done => {
      actions.leaveRoom({
        roomID: roomID,
        userID: 'some defunct userID',
        secret: '',
      })
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.DEFUNCT_USER);
          done();
        });
    });

    it('should reject if secret is wrong', done => {
      actions.leaveRoom({
        roomID: roomID,
        userID: userID,
        secret: '',
      })
        .catch(error => {
          assert.equal(error, ERRORS.API.LEAVE_ROOM.WRONG_SECRET);
          done();
        });
    });

    it('should resolve output data with properties roomID(string), userID(string)', done => {
      actions.joinRoom({roomID: roomID})
        .then(data => {
          assert.property(data, 'roomID');
          assert.property(data, 'userID');
          assert.isString(data.roomID);
          assert.isString(data.userID);
          done();
        });
    });

    it('should resolve {roomID, userID} as in data', done => {
      actions.leaveRoom({
        roomID: roomID,
        userID: userID,
        secret: secret,
      })
        .then(data => {
          assert.equal(data.roomID, roomID);
          assert.equal(data.userID, userID);
          done();
        });
    });
  });

  describe('#message(data)', () => {
    it('should reject if data === undefined', done => {
      actions.message()
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.EMPTY_DATA);
          done();
        });
    });

    it('should reject if data.roomID === undefined', done => {
      actions.message({})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.EMPTY_ROOM_ID);
          done();
        });
    });

    it('should reject if data.userID === undefined', done => {
      actions.message({roomID: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.EMPTY_USER_ID);
          done();
        });
    });

    it('should reject if data.secret === undefined', done => {
      actions.message({roomID: '', userID: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.EMPTY_SECRET);
          done();
        });
    });

    it('should reject if data.text === undefined', done => {
      actions.message({roomID: '', userID: '', secret: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.EMPTY_TEXT);
          done();
        });
    });

    it('should reject if data.time === undefined', done => {
      actions.message({roomID: '', userID: '', secret: '', text: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.EMPTY_TIME);
          done();
        });
    });

    it('should reject if data.roomID is not a string', done => {
      actions.message({roomID: 123, userID: '', secret: '', text: '', time: 0})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.INVALID_ROOM_ID);
          done();
        });
    });

    it('should reject if data.userID is not a string', done => {
      actions.message({roomID: '', userID: 123, secret: '', text: '', time: 0})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.INVALID_USER_ID);
          done();
        });
    });

    it('should reject if data.secret is not a string', done => {
      actions.message({roomID: '', userID: '', secret: 123, text: '', time: 0})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.INVALID_SECRET);
          done();
        });
    });

    it('should reject if data.text is not a string', done => {
      actions.message({roomID: '', userID: '', secret: '', text: 123, time: 0})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.INVALID_TEXT);
          done();
        });
    });

    it('should reject if data.time is not a number', done => {
      actions.message({roomID: '', userID: '', secret: '', text: '', time: ''})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.INVALID_TIME);
          done();
        });
    });

    it('should reject if room does not exist', done => {
      actions.message({roomID: 'some defunct roomID', userID: '', secret: '', text: '', time: 0})
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.DEFUNCT_ROOM);
          done();
        });
    });

    it('should reject if user does not exist', done => {
      actions.message({
        roomID: roomID, userID: '', secret: '', text: '', time: 0,
      })
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.DEFUNCT_USER);
          done();
        });
    });

    it('should reject if secret is wrong', done => {
      actions.message({
        roomID: roomID, userID: userID, secret: '', text: '', time: 0,
      })
        .catch(error => {
          assert.equal(error, ERRORS.API.MESSAGE.WRONG_SECRET);
          done();
        });
    });

    it('should resolve user with properties roomID(str), userID(str), messageID(str), text(str), time(number)', done => {
      actions.message({
        roomID: roomID, userID: userID, secret: secret, text: '', time: 0,
      })
        .then(data => {
          assert.property(data, 'roomID');
          assert.property(data, 'userID');
          assert.property(data, 'messageID');
          assert.property(data, 'text');
          assert.property(data, 'time');
          assert.isString(data.roomID);
          assert.isString(data.userID);
          assert.isString(data.messageID);
          assert.isString(data.text);
          assert.isNumber(data.time);
          done();
        });
    });

    it('should resolve {roomID, userID} as in data', done => {
      actions.message({
        roomID: roomID, userID: userID, secret: secret, text: '', time: 0,
      })
        .then(data => {
          assert.equal(data.roomID, roomID);
          assert.equal(data.userID, userID);
          done();
        });
    });
  });
});
