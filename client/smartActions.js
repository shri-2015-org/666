import * as actions from './actions';
import * as transport from './transport';

export const joinRoom = (dispatch, roomID) => {
  dispatch(actions.joinRoom(roomID));
  transport.joinRoom(roomID)
    .then(data => {
      return dispatch(actions.confirmJoinRoom(data));
    })
    .catch(description =>
      dispatch(actions.rejectJoinRoom(description)));
};

export const sendMessage = (dispatch, partialMessage) => {
  const message = {
    ...partialMessage,
    userID: partialMessage.myUserID, // TODO Why myUserID in PM?
    time: Date.now(),
  };
  dispatch(actions.sentMessage(message));
  transport.message(message)
    .then(data =>
      dispatch(actions.confirmSentMessage(data)))
    .catch(description =>
      dispatch(actions.rejectSentMessage(message, description)));
};

