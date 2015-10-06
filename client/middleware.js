import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { writeState } from './storage';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
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

  return Promise.resolve(action).then(store.dispatch);
};

let middleware = [thunkMiddleware, vanillaPromise, writeState];
middleware = NODE_ENV === 'production' ? middleware :
              middleware.concat(loggerMiddleware);

export default applyMiddleware(...middleware)(createStore);

