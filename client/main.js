import 'scss/main.scss';
import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import { readState } from './storage';
import createStorePlus from './store';
import all from './reducers';
import App from './components/App';
import RoomEntrance from './components/RoomEntrance';
import NotFound from './components/Splashes/NotFound';
import { updateTopRooms, newMessage, newAttachment,
         joinUser, leaveUser } from 'actions';
import { restoreState } from './smartActions';
import * as transport from './transport';
import { ReduxRouter } from 'redux-router';
import { Route } from 'react-router';

const store = createStorePlus(all);
const rootElement = document.getElementById('content');
const lastState = readState();

const app = (
  <Provider store={store}>
    {() =>
      <ReduxRouter>
        <Route path="/" component={App}>
          <Route path="/room/:roomID" component={RoomEntrance}/>
          <Route path="*" component={NotFound}/>
        </Route>
      </ReduxRouter>
    }
  </Provider>
);

transport.onMessage(data =>
    store.dispatch(newMessage(data)));

transport.onAttachment(data =>
    store.dispatch(newAttachment(data)));

transport.onJoinUser(data =>
    store.dispatch(joinUser(data)));
transport.onLeaveUser(data =>
    store.dispatch(leaveUser(data)));

transport.onTopRooms(data =>
    store.dispatch(updateTopRooms(data.rooms)));

React.render(app, rootElement);

// dispatch after render. otherwise the router doesn't initialize correctly
store.dispatch(restoreState(lastState));

