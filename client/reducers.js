import { combineReducers } from 'redux';
import * as actions from './actions';

const initialPending = {
  count: 0,
  messages: [],
};

function login(state = null, action) {
  switch (action.type) {
    case actions.NEW_LOGIN: return action.login;
    default: return state;
  }
}

function pending(state = initialPending, action) {
  switch (action.type) {
    case actions.ADD_MESSAGE_PENDING: {
      const id = state.count;
      const newCount = state.count + 1;
      return {
        count: newCount,
        messages: [
          ...state.messages,
          {
            id,
            text: action.text,
          },
        ],
      };
    }
    default: return state;
  }
}

function received(state = [], action) {
  switch (action.type) {
    case actions.ADD_MESSAGE_RECEIVED: {
      return [
        ...state,
        action.message,
      ];
    }
    default: return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case actions.ADD_USER: {
      return [
        ...state,
        action.user,
      ];
    }
    default: return state;
  }
}

function navigation(state = true, action) {
  switch (action.type) {
    case actions.TOGGLE_NAVIGATION: {
      return !state;
    }
    default: return state;
  }
}

const all = combineReducers({login, users, navigation, received, pending});

export default all;
