import _ from 'lodash';
import * as storage from './storage';

const OK = 'OK';
const ERR = 'ERROR';

function wrapper(stat, broadcast) {
  return (data) => {
    return {
      broadcast,
      response: { stat, data },
    };
  };
}

function readMessage(data) {
  // where is validation?
  return storage
    .readMessage(_.result(data, 'mid'))
    .then(wrapper(OK, false));
}

function message(data) {
  if (data && data.uid) {
    return storage
      .addUnreadMessage(data)
      .then(wrapper(OK, true));
  }
  return Promise
    .resolve('[uid] is not found')
    .then(wrapper(ERR, false));
}

function roomUser() {
  return storage
    .getRoomUser
    .then(wrapper(OK, false));
}

function login(data) {
  return storage
    .getUser(_.result(data, 'uid'))
    .then(wrapper(OK, true))
    .catch( () => {
      return storage
        .createUser()
        .then(wrapper(OK, true));
    });
}

function user(data) {
  return storage
    .getUser(_.result(data, 'uid'))
    .then(wrapper(OK, true));
}

export default {
  'readMessage': readMessage,
  'message': message,
  'roomUsers': roomUser,
  'login': login,
  'user': user,
};

