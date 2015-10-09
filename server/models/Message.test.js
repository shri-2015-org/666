import { assert } from 'chai';

import utils from '../testUtils';

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
      const message = new Message.model(messageData);
      message.save( (err, createdMessage) => {
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
      const message = new Message.model({});
      message.save( (err, createdMessage) => {
        assert.equal(err.name, 'ValidationError');
        done();
      });
    });
  });
});
