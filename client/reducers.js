import { combineReducers } from 'redux';
import * as actions from 'actions';

function login(state = null, action) {
  switch (action.type) {
    case actions.NEW_LOGIN: return action.login;
    default: return state;
  }
}

function messages(state = [], action) {
  switch (action.type) {
    case actions.MESSAGE: {
      if (action.message.status === 'pending') {
        return [
          ...state,
          action.message
        ]
      } else {
        return state.map(message => {
          if (message.mid === action.message.mid) {
            message.status = 'delivered';
          }

          return message;
        });
      }

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

const all = combineReducers({login, users, messages});

export default all;
