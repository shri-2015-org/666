import { sentMessage, confirmSentMessage, rejectSentMessage } from './actions.js';

export const sendMessage = (dispatch, partialMessage) => {
  const message = {
    ...partialMessage,
    time = Time.now();
  };
  dispatch(sentMessage(message));
  transport.message(message)
    .then(data =>
      dispatch(confirmSentMessage(data)))
    .catch(description =>
      dispatch(rejectSentMessage(message, description)));
}

