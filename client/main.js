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

const createStorePlus = NODE_ENV === 'production' ?
                        applyMiddleware()(createStore) :
                        applyMiddleware(loggerMiddleware)(createStore);

const store = createStorePlus(all);
const SmartApp = connect(propsFromState)(App);
const rootElement = document.getElementById('content');

const app = (
  <Provider store={store}>
    {() => <SmartApp addMessage={text => store.dispatch(addMessagePending(text))} />}
  </Provider>
);

transport.onTopRooms(data =>
    store.dispatch(updateTopRooms(data.rooms)));

transport.onMessage(data =>
    store.dispatch(newMessage(data)));

transport.onJoinUser(data =>
    store.dispatch(joinUser(data)));

transport.onleaveUser(data =>
    store.dispatch(leaveUser(data)));

React.render(app, rootElement);

