import {
  SERVER, CLIENT,
  UP, DOWN,
  NOTIFICATION, EXCHANGE,
  Role, Protocol,
} from '../utils/protocols';
export { SERVER, CLIENT };
import { annotate, annotated } from '../utils/annotation';
import { Str, Any, MapOf, Func } from '../utils/invariants';

const forEach = (object, f) =>
  Object.keys(object).forEach(key => f(key, object[key]));

const Socket = Any; // TODO
const FuncMap = MapOf(Func());

export default class Builder {
  @annotated(Socket, Role, Protocol, FuncMap)(FuncMap)
  static build(socket, role, protocol, receiveCallbacks) {
    const sendCallbacks = {};

    const IN  = role === CLIENT ? DOWN : UP;
    const OUT = role === CLIENT ? UP : DOWN;

    const connectIn = (key, name, invariant) => {
      const callback = receiveCallbacks[key];
      if (callback === undefined) {
        throw new Error(`buildTransport: the callback at '${name}' ` +
                        `was not defined`);
      }
      console.log(`transport can receive from: ${name}`);
      const callbackPlus = data => {
        console.log(`packet received: ${name}, ${data}`);
        callback(data);
      };
      const annotatedCallback = annotate(invariant)()(callbackPlus);
      socket.on(name, annotatedCallback);
    };

    const connectOut = (key, name, invariant) => {
      console.log(`transport can send to: ${name}`);
      const callback = data => {
        console.log(`packet sent: ${name}, ${data}`);
        socket.emit(name, data);
      };
      sendCallbacks[key] = annotate(invariant)()(callback);
    };

    const connect = dir => dir === IN  ? connectIn : connectOut;
    const connectReverse = dir => dir === OUT ? connectIn : connectOut;

    forEach(protocol, (key, value) => {
      const dir = value.direction;

      if (value.type === NOTIFICATION) {
        const name = `notification-${dir}:${key}`;
        connect(dir)(key, name, value.dataInvariant);
      } else if (value.type === EXCHANGE) {
        const rid = dir === UP ? DOWN : UP;
        const nameRequest = `request-${dir}:${key}`;
        const nameReply   = `reply-${rid}:${key}`;
        connect(dir)(key, nameRequest, value.requestInvariant);
        connectReverse(dir)(key, nameReply, value.replyInvariant);
      }
    });

    return sendCallbacks;
  }
}

