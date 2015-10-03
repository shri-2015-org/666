import { assert } from 'chai';

import utils from './testUtils';
import mongoose from 'mongoose';

import * as Message from './Message';

describe('Message: model', () => {
  describe('#create()', () => {
    it('should create a new Message', done => {
      const messageData = {
        roomID: 'roomID',
        userID: 'userID',
        messageID: 'messageID',
        text: 'text',
        time: 0,
      };
      Message.model.create(messageData, (err, createdMessage) => {
        assert.equal(err, null);
        assert.equal(createdMessage.roomID, 'roomID');
        assert.equal(createdMessage.userID, 'userID');
        assert.equal(createdMessage.messageID, 'messageID');
        assert.equal(createdMessage.text, 'text');
        assert.equal(createdMessage.time, 0);

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
