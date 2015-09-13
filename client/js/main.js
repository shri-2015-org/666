import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import all from './reducers';
import App from './components/App.js';
import loggerMiddleware from 'redux-logger';
import io from 'socket.io-client';

import { addUser, addMessageReceived, newLogin } from './actions.js';
import { cloneDeep } from 'lodash';

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

const socket = io('http://localhost:3000/');

function _setUID(uid) {
  localStorage['user_uid'] = uid;
}

function _getUID() {
  return localStorage['user_uid'];
}

function onMessage(message) {
  console.log('Event: onMessage', message);

  store.dispatch(addMessageReceived(message));
}

function onLoginRes(user) {
  console.log('Event: onLoginRes', user);

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
