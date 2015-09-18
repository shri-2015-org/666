import { assert, expect, should } from 'chai';
should(); // actually call the function

import * as actions from './actions';

describe('actions', () => {
  it('should create an action to add pending message', () => {
    const text = 'Some text message';
    const addMessagePending = {
      type: 'ADD_MESSAGE_PENDING',
      text,
    };
    expect(actions.addMessagePending(text)).to.deep.equal(addMessagePending);
  });

  it('should create an action to add recived message', () => {
    const message = 'Some text message';
    const addMessageReceived = {
      type: 'ADD_MESSAGE_RECEIVED',
      message,
    };
    expect(actions.addMessageReceived(message)).to.deep.equal(addMessageReceived);
  });

  it('should create an action to add user', () => {
    const user = {uid: 'uid'};
    const addUser = {
      type: 'ADD_USER',
      user,
    };
    expect(actions.addUser(user)).to.deep.equal(addUser);
  });

  it('should create an action to new login', () => {
    const login = 'login';
    const newLogin = {
      type: 'NEW_LOGIN',
      login,
    };
    expect(actions.newLogin(login)).to.deep.equal(newLogin);
  });
});

