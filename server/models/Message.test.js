import { assert, should, expect } from 'chai';

import utils from './testUtils';
import mongoose from 'mongoose';

import * as Message from './Message';

describe('Message: model', () => {
  describe('#create()', () => {
    it('should create a new Message', done => {
      const messageData = {
        uid: 'uid',
        mid: 'mid',
        text: 'text',
        time: Date.now(),
        read: 'read',
        status: 'status',
      };
      Message.model.create(messageData, (err, createdMessage) => {
        assert.equal(err, null);
        assert.equal(createdMessage.uid, 'uid');
        assert.equal(createdMessage.mid, 'mid');
        assert.equal(createdMessage.text, 'text');
        assert.equal(createdMessage.time, messageData.time);
        assert.equal(createdMessage.read, 'read');
        assert.equal(createdMessage.status, 'status');
        done();
      });
    });
    it('should throw Error', done => {
      const messageData = {};
      Message.model.create(messageData, (err, createdMessage) => {
        assert.equal(err.name, 'ValidationError');
        done();
      });
    });
  });
});
