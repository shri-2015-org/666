import 'scss/main.scss';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import all from './reducers';
import App from './components/App';
import { updateTopRooms, newMessage, joinUser, leaveUser } from 'actions';
import * as transport from './transport';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const applyMiddlewares = NODE_ENV === 'production' ?
                         applyMiddleware(thunkMiddleware) :
                         applyMiddleware(thunkMiddleware, loggerMiddleware);

const createStorePlus = applyMiddlewares(createStore);

const store = createStorePlus(all);
const rootElement = document.getElementById('content');

const app = (
  <Provider store={store}>
    {() => <App />}
  </Provider>
);

transport.onTopRooms(data =>
    store.dispatch(updateTopRooms(data.rooms)));

transport.onMessage(data =>
    store.dispatch(newMessage(data)));

transport.onJoinUser(data =>
    store.dispatch(joinUser(data)));

transport.onLeaveUser(data =>
    store.dispatch(leaveUser(data)));

React.render(app, rootElement);

