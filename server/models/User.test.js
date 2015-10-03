import { assert } from 'chai';

import utils from '../testUtils';

import * as User from './User';

describe('User: model', () => {
  describe('#create()', () => {
    it('should create a new User', done => {
      const userData = {
        roomID: 'roomID',
        userID: 'userID',
        secret: 'secret',
        avatar: 'avatar',
        nick: 'nick',
      };
      const user = new User.model(userData);
      user.save( (err, createdUser) => {
        assert.equal(err, null);
        assert.equal(createdUser.roomID, 'roomID');
        assert.equal(createdUser.userID, 'userID');
        assert.equal(createdUser.secret, 'secret');
        assert.equal(createdUser.avatar, 'avatar');
        assert.equal(createdUser.nick, 'nick');
        done();
      });
    });
    it('should throw Error', done => {
      const userData = {};
      const user = new User.model(userData);
      user.save( (err, createdUser) => {
        assert.equal(err.name, 'ValidationError');
        done();
      });
    });
  });
});
