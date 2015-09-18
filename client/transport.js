import io from 'socket.io-client';
import * as API from '~/common/transport/api';
import { addMessageReceived, newLogin } from './actions.js';
import { buildTransport, CLIENT } from '~/common/transport/builder';

/* eslint no-console: 0 */
const log = console.log.bind(console, 'transport:');
const socket = io('localhost:3001');
log('socket connection');

function _setUID(uid) {
  localStorage.setItem('user_uid', uid);
}

function _getUID() {
  return localStorage.getItem('user_uid');
}

export default buildTransport(socket, CLIENT, API.protocol, {
  login: data => {
    assertInvariant(data, API.User);
    log('On: login', data);
    _setUID(data.uid);
    store.dispatch(newLogin(data));
  },
  message: data => {
    assertInvariant(data, API.Message);
    log('On: message', data);
    store.dispatch(addMessageReceived(data));
  },
});

