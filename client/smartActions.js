import * as actions from './actions';
import * as transport from './transport';

export const joinRoom = roomID => dispatch => {
  dispatch(actions.joinRoom(roomID));
  transport.joinRoom(roomID)
    .then(data =>
      dispatch(actions.confirmJoinRoom(data)))
    .catch(description =>
      dispatch(actions.rejectJoinRoom(description)));
};

export const sendMessage = partialMessage => dispatch => {
  const message = {
    ...partialMessage,
    time: Date.now(),
  };
  dispatch(actions.sentMessage(message));
  transport.message(message)
    .then(data =>
      dispatch(actions.confirmSentMessage(data)))
    .catch(description =>
      dispatch(actions.rejectSentMessage(message, description)));
};

