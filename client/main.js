import 'scss/main.scss';

import React from 'react';
import { Provider } from 'react-redux';

import { readState } from './storage';
import createStorePlus from './middleware';
import all from './reducers';
import App from './components/App';
import { updateTopRooms, newMessage, joinUser, leaveUser } from './actions';
import { restoreState } from './smartActions';
import * as transport from './transport';

const store = createStorePlus(all);
const rootElement = document.getElementById('content');

const app = (
  <Provider store={store}>
    {() => <App />}
  </Provider>
);

store.dispatch(restoreState(readState()))
  .then(() => {
    transport.onMessage(data =>
        store.dispatch(newMessage(data)));
    transport.onJoinUser(data =>
        store.dispatch(joinUser(data)));
    transport.onLeaveUser(data =>
        store.dispatch(leaveUser(data)));
  });

transport.onTopRooms(data =>
    store.dispatch(updateTopRooms(data.rooms)));

React.render(app, rootElement);

