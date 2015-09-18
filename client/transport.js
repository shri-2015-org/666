import io from 'socket.io-client';
import { protocol } from '~/common/transport/api';
import { buildTransport, CLIENT } from '~/common/transport/builder';

export default receiveCallbacks => {
  const socket = io('localhost:3001');
  const log = console.log.bind(console, 'transport:');
  log('socket connection');

  return buildTransport(socket, CLIENT, protocol, receiveCallbacks);
};
