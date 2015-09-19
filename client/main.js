import 'scss/main.scss';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import loggerMiddleware from 'redux-logger';

import all from './reducers';
import App from './components/App/App.js';
import { addMessagePending, addMessageReceived, newLogin } from 'actions';
import * as transport from './transport.js';

function propsFromState(state) {
  return {
    messages: state.messages,
  };
}

const createStorePlus = applyMiddleware(loggerMiddleware)(createStore);
const store = createStorePlus(all);
const SmartApp = connect(propsFromState)(App);
const rootElement = document.getElementById('content');

const app = (
  <Provider store={store}>
    {() => <SmartApp addMessage={text => store.dispatch(addMessagePending(text))} />}
  </Provider>
);

transport.loginReq();
transport.loginRes(store, newLogin);
transport.onMessage(store, addMessageReceived);

React.render(app, rootElement);

