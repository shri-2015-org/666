require('scss/main.scss');

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import loggerMiddleware from 'redux-logger';

import all from './reducers';
import App from './components/App.js';
import transportConstructor from './transport.js';
import { addMessageReceived, newLogin } from './actions.js';

function _setUID(uid) {
  localStorage.setItem('user_uid', uid);
}

function _getUID() {
  return localStorage.getItem('user_uid');
}

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

const transport = transportConstructor({
  login: data => {
    _setUID(data.uid);
    store.dispatch(newLogin(data));
  },
  message: data => {
    store.dispatch(addMessageReceived(data));
  },
});

transport.login({uid: 'fake-uid'});

const SmartApp = connect(propsFromState)(App);
const rootElement = document.getElementById('content');

const addMessage = text => {
  const uid = store.getState().login.uid;
  transport.sendMessage({text, uid});
};

const app = (
  <Provider store={store}>
    {() => <SmartApp addMessage={addMessage} />}
  </Provider>
);

React.render(app, rootElement);

