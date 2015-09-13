import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import loggerMiddleware from 'redux-logger';

import all from './reducers';
import App from './components/App.js';
import { addMessageReceived, newLogin } from './actions.js';
import * as transport from './transport.js';

function propsFromState(state) {
  return {
    messages: [
      ...state.received,
      ...state.pending.messages,
    ],
    addMessage: transport.sendMessage,
  };
}

const createStorePlus = applyMiddleware(loggerMiddleware)(createStore);
const store = createStorePlus(all);
const SmartApp = connect(propsFromState)(App);
const rootElement = document.getElementById('content');

const app = (
  <Provider store={store}>
    {() => <SmartApp />}
  </Provider>
);

transport.loginReq();
transport.loginRes(store, newLogin);
transport.onMessage(store, addMessageReceived);

React.render(app, rootElement);

