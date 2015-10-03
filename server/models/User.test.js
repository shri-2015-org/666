import { assert, should, expect } from 'chai';

import utils from './testUtils';
import mongoose from 'mongoose';

import * as User from './User';

describe('User: model', () => {
  describe('#create()', () => {
    it('should create a new User', done => {
      const userData = {
        name: 'name',
        avatar: 'avatar',
        uid: 'uid',
      };
      User.model.create(userData, (err, createdUser) => {
        assert.equal(err, null);
        assert.equal(createdUser.name, 'name');
        assert.equal(createdUser.avatar, 'avatar');
        assert.equal(createdUser.uid, 'uid');
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
