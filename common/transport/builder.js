import { SERVER, CLIENT, UP, DOWN, NOTIFICATION, EXCHANGE }
  from '../utils/protocols';
export { SERVER, CLIENT };
import { annotate } from '../utils/annotation';

const forEach = (object, f) =>
  Object.keys(object).forEach(key => f(key, object[key]));

export function buildTransport(socket, role, protocol, receiveCallbacks) {
  const sendCallbacks = {};

  const IN  = role === CLIENT ? DOWN : UP;
  const OUT = role === CLIENT ? UP : DOWN;

  const connectIn = (key, name, invariant) => {
    const callback = receiveCallbacks[key];
    if (callback === undefined) {
      throw new Error(`buildTransport: the callback at '${name}' ` +
                      `was not defined`);
    }
    const annotatedCallback = annotate(invariant)()(callback);
    socket.on(name, annotatedCallback);
  };

  const connectOut = (key, name, invariant) => {
    const callback = data => socket.emit(name, data);
    sendCallbacks[key] = annotate(invariant)()(callback);
  };

  const connect = dir => dir === IN  ? connectIn : connectOut;
  const connectReverse = dir => dir === OUT ? connectIn : connectOut;

  forEach(protocol, (key, value) => {
    const dir = value.direction;

    if (value.type === NOTIFICATION) {
      const name = `notification-${dir}:${name}`;
      connect(dir)(key, name, value.dataInvariant);
    } else if (value.type === EXCHANGE) {
      const nameRequest = `request-${dir}:${name}`;
      const nameReply   = `reply-${dir}:${name}`;
      connect(dir)(key, nameRequest, value.requestInvariant);
      connectReverse(dir)(key, nameReply, value.replyInvariant);
    }
  });

  return sendCallbacks;
}

