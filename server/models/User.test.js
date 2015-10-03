import { assert, should, expect } from 'chai';

import utils from './testUtils';
import mongoose from 'mongoose';

import * as User from './User';

describe('User: model', () => {
  describe('#create()', () => {
    it('should create a new User', done => {
      const userData = {
        roomID: 'roomID',
        userID: 'userID',
        avatar: 'avatar',
        nick: 'nick',
      };
      User.model.create(userData, (err, createdUser) => {
        assert.equal(err, null);
        assert.equal(createdUser.roomID, 'roomID');
        assert.equal(createdUser.userID, 'userID');
        assert.equal(createdUser.avatar, 'avatar');
        assert.equal(createdUser.nick, 'nick');
        done();
      });
    });
    it('should throw Error', done => {
      const userData = {};
      User.model.create(userData, (err, createdUser) => {
        assert.equal(err.name, 'ValidationError');
        done();
      });
    });
  });
});
