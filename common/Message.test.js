/* eslint no-console: 0 */
import { assert, expect, should } from 'chai';
should(); // actually call the function

import Message from './Message';

describe('Message class', () => {
  const options = {
    uid: 'some uid',
    text: 'some text',
    time: Date.now(),
    read: true,
  };
  const message = new Message(options);

  it('message is object and instance of Message', () => {
    message.should.be.a('object');
    assert.instanceOf(message, Message);
  });

  it('types of message fields', () => {
    expect(message.uid).to.be.a('string');
    expect(message.text).to.be.a('string');
    expect(message.time).to.be.a('number');
    expect(message.read).to.be.a('boolean');
  });

  it('value of message fields', () => {
    assert.equal(message.uid, 'some uid');
    assert.equal(message.text, 'some text');
    assert.equal(message.time, options.time);
    assert.equal(message.read, true);
    assert.equal(message.mid, undefined);
    assert.equal(message.status, undefined);
  });
});

