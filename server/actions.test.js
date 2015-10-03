import { assert } from 'chai';

import utils from './testUtils';

import * as actions from './actions';

describe('actions', () => {
  describe('#createRoom({roomID})', () => {
    it('should reject if roomID === undefined', done => {
      actions.createRoom({})
        .catch(error => {
          assert.equal(error.name, 'ValidationError');
          done();
        });
    });
  });
  describe('#joinRoom({roomID})', () => {
    it('should reject if roomID === undefined', done => {
      const data = {roomID: 'roomID'};
      actions.joinRoom(data)
        .catch(error => {
          assert.equal(error, 'Error: Can not create user in unexisted room');
          done();
        });
    });
    it('should resolve with new User', done => {
      const data = {roomID: 'roomID'};
      actions.createRoom(data)
        .then(actions.joinRoom)
        .then(user => {
          assert.equal(user.roomID, 'roomID');
          done();
        });
    });
  });
});
