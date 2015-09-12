import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import App from './components/App.js'

function noOp (state = null, action) {
  return state;
}
function propsFromState () { 
  return {
    messages: []
  };
}

const store = createStore (noOp);
const SmartApp = connect(propsFromState)(App);
const rootElement = document.getElementById ('content');

const app = (
  <Provider store={store}>
    {() => <SmartApp />}
  </Provider>)
React.render(app, rootElement);
