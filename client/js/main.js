import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import App from './components/App.js'
import { addUser } from './actions.js';
import { cloneDeep } from 'lodash';

const store = createStore (noOp);

function noOp(state = {users: []}, action) {
  switch(action.type) {
    case 'ADD_USER':
      state.users.push(action.user);
      state = _.cloneDeep(state);
      return state;
    default:
      return state;
  };
}

function propsFromState () {
  return {
    messages: []
  };
}

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
