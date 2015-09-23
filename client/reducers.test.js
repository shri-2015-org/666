/* eslint no-unused-vars: 0 */
import { assert, expect, should } from 'chai';
should(); // actually call the function

import * as actions from './actions';
import reducer from './reducers';

describe('reducer', () => {
  const test = {
    login: null,
    navigation: true,
    users: [],
    received: [],
    pending: {
      count: 0,
      messages: [],
    },
  };

  it('should return the initial state', () => {
    expect( reducer(undefined, {}) ).to.deep.equal( test );
    expect( reducer([], {}) ).to.deep.equal( test );
  });

  it('should handle NEW_LOGIN', () => {
    expect(
      reducer([], {
        type: 'NEW_LOGIN',
        login: {uid: 'some uid'},
      })
      ).to.deep.equal(
        Object.assign({}, test, {
          login: { uid: 'some uid' },
        })
      );
  });

  it('should handle ADD_USER', () => {
    expect(
      reducer([], {
        type: 'ADD_USER',
        user: {uid: 'other uid'},
      })
    ).to.deep.equal(
      Object.assign({}, test, {
        users: [ { uid: 'other uid' }],
      })
    );
  });
});

