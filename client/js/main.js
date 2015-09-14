require('../scss/main.scss');

import { Shape, Num, Str } from './types';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import all from './reducers';
import App from './components/App.js';
import loggerMiddleware from 'redux-logger';
import io from 'socket.io-client';
import { assertType } from './types';

import { addMessageReceived, newLogin } from './actions.js';

function propsFromState(state) {
  return {
    messages: [
      ...state.received,
      ...state.pending.messages,
    ],
  };
}

const createStorePlus = applyMiddleware(loggerMiddleware)(createStore);

const store = createStorePlus(all);

const socket = io('localhost:3001');

function _setUID(uid) {
  localStorage.user_uid = uid;
}

function _getUID() {
  return localStorage.user_uid;
}

const TransportMessageT = Shape({
  text: Str,
  uid: Str,
  time: Num,
});

const TransportUserT = Shape({
  avatar: Str,
  uid: Str,
  name: Str,
});

function onMessage(message) {
  console.log('Event: onMessage', message);

  assertType(message, TransportMessageT);

  store.dispatch(addMessageReceived(message));
}

function onLoginRes(user) {
  console.log('Event: onLoginRes', user);

  assertType(user, TransportUserT);

  _setUID(user.uid);
  store.dispatch(newLogin(user));
}

socket.on('loginRes', onLoginRes);
socket.emit('loginReq', {uid: _getUID()});
socket.on('message', onMessage);

const SmartApp = connect(propsFromState)(App);
const rootElement = document.getElementById('content');

const app = (
  <Provider store={store}>
    {() => <SmartApp />}
  </Provider>);
React.render(app, rootElement);
