import { UP, DOWN } from './api';
export { SERVER, CLIENT } from '~/common/utils/protocols';

export function buildTransport(socket, role, protocol, receiveCallbacks) {
  const sendCallbacks = {};

  const IN  = role === CLIENT ? DOWN : UP;
  const OUT = role === CLIENT ? UP : DOWN;

  const connectIn = (name, invariant) => {
    const callback = receiveCallbacks[name];
    if (callback === undefined) {
      throw new Error(`buildTransport: the callback at '${name}' ` +
                      `was not defined`);
    }
    annotatedCallback = annotate(invariant)()(callback);
    socket.on(name, annotatedCallback);
  };

  const connectOut = (name, invariant) => {
    const callback = data => socket.emit(name, data);
    sendCallbacks[name] = annotate(invariant)()(callback);
  };

  const connect = dir => dir === IN  ? connectIn : connectOut;
  const connectReverse = dir => dir === OUT ? connectIn : connectOut;

  forEach(protocol, (key, value) => {
    const dir = value.direction;

    if (value.type === NOTIFICATION) {
      const name = `notification-${dir}:${name}`;
      connect(dir)(name, value.dataInvariant);
    } else if (value.type === EXCHANGE) {
      const nameRequest = `request-${dir}:${name}`;
      const nameReply   = `reply-${dir}:${name}`;
      connect(dir)(nameRequest, value.requestInvariant);
      connectReverse(dir)(nameReply, value.replyInvariant);
    }
  });
}

