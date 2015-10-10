import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { reduxReactRouter } from 'redux-router';

import { writeState } from './storage';
import createHistory from 'history/lib/createBrowserHistory';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (_, action) =>
    action.type !== 'ROOM_INPUT_CHANGE' &&
    action.type !== 'SEARCH_INPUT_CHANGE',
});

/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
const vanillaPromise = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action);
  }

  action.then(store.dispatch);
  return action;
};

let middleware = [thunkMiddleware, vanillaPromise, writeState];
middleware = NODE_ENV === 'production' ? middleware :
              middleware.concat(loggerMiddleware);

export default compose(
  applyMiddleware(...middleware),
  reduxReactRouter({ createHistory })
)(createStore);

