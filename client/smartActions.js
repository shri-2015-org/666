import * as actions from './actions';
import * as transport from './transport';

export const switchToRoom = roomID => (dispatch, getState) => {
  const state = getState();
  const { currentRoomID } = state.ui;
  if (currentRoomID === roomID) return; // do nothing!
  const needToJoin = state.joinedRooms[roomID] === undefined;

  if (needToJoin) {
    dispatch(actions.joinRoom(roomID));
    transport.joinRoom(roomID)
      .then(data => {
        dispatch(actions.confirmJoinRoom(data));
        dispatch(actions.switchToJoinedRoom(roomID));
      })
      .catch(description =>
        dispatch(actions.rejectJoinRoom(description)));
  } else {
    dispatch(actions.switchToJoinedRoom(roomID));
  }
};

export const leaveRoom = roomID => (dispatch, getState) => {
  const state = getState();
  const room = state.joinedRooms[roomID]
  if (!room) {
    console.log("Cannot leave room ${roomID}: we are not in it!?");
  }
  const { secret, userID } = room;
  dispatch(actions.leaveRoom(roomID));
  transport.leaveRoom({roomID, userID, secret})
  // TODO handle replies?
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

