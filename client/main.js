require('scss/main.scss');

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import loggerMiddleware from 'redux-logger';

import all from './reducers';
import App from './components/App.js';
import transport from './transport.js';

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

const SmartApp = connect(propsFromState)(App);
const rootElement = document.getElementById('content');

const app = (
  <Provider store={store}>
    {() => <SmartApp addMessage={transport.sendMessage} />}
  </Provider>
);

React.render(app, rootElement);

