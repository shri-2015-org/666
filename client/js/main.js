import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import all from './reducers';
import App from './components/App.js'
import loggerMiddleware from 'redux-logger';

import { addUser } from './actions.js';
import { cloneDeep } from 'lodash';

function propsFromState (state) {
  return {
    messages: [
      ...state.received,
      ...state.pending.messages,
    ]
  };
}

const createStorePlus = applyMiddleware(loggerMiddleware)(createStore);

const store = createStorePlus (all);

const socket = io('http://localhost:3000/');

function _setUID(uid) {
  localStorage['user_uid'] = uid;
}

function _getUID() {
  return localStorage['user_uid'];
}

const onLogin = function (data) {
  const user = JSON.parse(data);

  _setUID(user.uid);

  store.dispatch(addUser(user));
};

socket.on('loginRes', onLogin);
socket.emit('loginReq', {uid: _getUID()});

const SmartApp = connect(propsFromState)(App);
const rootElement = document.getElementById ('content');

const app = (
  <Provider store={store}>
    {() => <SmartApp />}
  </Provider>)
React.render(app, rootElement);
