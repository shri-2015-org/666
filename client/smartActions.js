import * as actions from './actions';
import * as transport from './transport';
import validRoomID from '../common/RoomID';

export const searchInputChange = partialRoomID => dispatch => {
  dispatch(actions.searchInputChange(partialRoomID));
  if (partialRoomID.length > 0) {
    transport.searchRoomID(partialRoomID)
      .then(data =>
        dispatch(actions.searchResultsUpdate(data))
      , description =>
        dispatch(actions.searchResultsFailed(description))
      );
  } else {
    dispatch(actions.searchResultsUpdate(null));
  }
};

export const joinRoom = roomID => (dispatch, getState) => {
  let partial = {roomID};
  if (roomID) {
    const state = getState();
    const room = state.joinedRooms[roomID];
    partial = !room ? partial : {
      ...partial,
      userID: room.userID,
      secret: room.secret,
    };
  }
  dispatch(actions.joinRoom(roomID));
  const result = transport.joinRoom(partial)
    .then(data => actions.confirmJoinRoom(data),
          description => actions.rejectJoinRoom(description));
  return dispatch(result);
};

export const reJoinRooms = rooms => dispatch => {
  if (!rooms) return; // void
  const roomKeys = Object.keys(rooms);
  roomKeys.map(roomID => dispatch(joinRoom(roomID)));
};

export const switchToRoom = roomID => (dispatch, getState) => {
  const state = getState();
  const { currentRoomID } = state.ui;
  if (roomID && currentRoomID === roomID) return; // do nothing!
  const needToJoin = state.joinedRooms[roomID] === undefined;

  if (needToJoin) {
    dispatch(joinRoom(roomID))
      .then(({room}) => dispatch(actions.switchToJoinedRoom(room.roomID)));
  } else {
    dispatch(actions.switchToJoinedRoom(roomID));
  }
};

export const createRoom = roomID => dispatch => {
  if (validRoomID(roomID)) {
    transport.createRoom(roomID)
      .then(() => {
        dispatch(actions.searchResultsUpdate(null));
        dispatch(switchToRoom(roomID));
      }, description =>
        dispatch(actions.createRoomFailed(description))
      );
  } else {
    // TODO показать пользователю, что такой создать нельзя
  }
};

export const leaveRoom = roomID => (dispatch, getState) => {
  const state = getState();
  const room = state.joinedRooms[roomID];
  if (!room) {
    console.log(`Cannot leave room ${roomID}: we are not in it!?`);
    return;
  }
  const { secret, userID } = room;
  dispatch(actions.leaveRoom(roomID));
  transport.leaveRoom({roomID, userID, secret});
  // TODO handle replies?
};

let _totalSent = 0;
function newPendingID() {
  return _totalSent++;
}

export const sendMessage = partialMessage => dispatch => {
  const pendingID = `pending-message:${newPendingID()}`;
  const { roomID } = partialMessage;
  const message = {
    ...partialMessage,
    time: Date.now(),
  };
  dispatch(actions.sentMessage(pendingID, message));
  transport.message(message)
    .then(data =>
      dispatch(actions.confirmSentMessage(pendingID, data))
        , description =>
      dispatch(actions.rejectSentMessage(pendingID, roomID, description))
    );
};

