import * as actions from './actions';
import * as transport from './transport';
import validRoomID from '../common/RoomID';
import { pushState } from 'redux-router';

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

// returns a Promise(bool) -- was the operation successful?
export const joinRoom = ({roomID, userID, secret}) => dispatch => {
  dispatch(actions.joiningRoom(roomID));
  return transport.joinRoom({roomID, userID, secret})
    .then(
      data => {
        dispatch(actions.confirmJoinRoom(data));
        return true;
      },
      description => {
        dispatch(pushState(null, `/`));
        dispatch(actions.rejectJoinRoom(description));
        return false;
      });
};

export const restoreState = state => dispatch => {
  if (!state || !state.joinedRooms) return Promise.resolve();

  const rooms = state.joinedRooms;
  const roomKeys = Object.keys(rooms);

  const routerRoomID = state.router.params.roomID;
  if (routerRoomID && !rooms[routerRoomID]) {
    dispatch(joinRoom({roomID: routerRoomID}));
  }

  roomKeys.forEach(roomID => {
    const { userID, secret } = rooms[roomID];
    dispatch(joinRoom({roomID, userID, secret}));
  });
};

export const switchToRoom = (history, roomID) => (dispatch, getState) => {
  const state = getState();
  const routerRoomID = state.router.params.roomID;
  if (roomID && routerRoomID === roomID) return; // do nothing!
  const needToJoin = !roomID || (state.joinedRooms[roomID] === undefined);

  if (needToJoin) {
    dispatch(joinRoom({roomID}))
    .then(didJoin => {
      if (didJoin) {
        dispatch(pushState(history, `/room/${roomID}`));
      }
    });
  } else {
    dispatch(pushState(history, `/room/${roomID}`));
  }
};

export const createRoom = (history, roomID) => dispatch => {
  if (validRoomID(roomID)) {
    transport.createRoom(roomID)
      .then(() => {
        dispatch(actions.searchResultsUpdate(null));
        dispatch(switchToRoom(history, roomID));
      }, description =>
        dispatch(actions.createRoomFailed(description))
      );
  } else {
    // TODO показать пользователю, что такой создать нельзя
  }
};

export const leaveRoom = (history, roomID) => (dispatch, getState) => {
  const state = getState();
  const room = state.joinedRooms[roomID];
  if (!room) {
    console.log(`Cannot leave room ${roomID}: we are not in it!?`);
    return;
  }
  const { secret, userID } = room;
  const routerRoomID = state.router.params.roomID;
  if (routerRoomID === roomID) {
    dispatch(pushState(history, `/`));
  }
  dispatch(actions.leaveRoom(roomID));
  transport.leaveRoom({roomID, userID, secret});
  // TODO handle replies?
};

let _totalSent = 0;
function newPendingID() {
  return _totalSent++;
}

export const sendMessage = () => (dispatch, getState) => {
  const state = getState();
  if (state.ui.roomInputText === '') return; // don't send
  const roomID = state.router.params.roomID;
  const room = state.joinedRooms[roomID];
  if (!room) {
    throw new Error('Terminal failure: sent a message without being in a room.');
  }
  const { userID, secret } = room;
  const message = {
    roomID,
    userID,
    secret,
    text: state.ui.roomInputText,
    time: Date.now(),
  };
  dispatch(actions.roomInputChange(''));
  const pendingID = `pending-message:${newPendingID()}`;
  dispatch(actions.sentMessage(pendingID, message));
  transport.message(message)
    .then(data =>
      dispatch(actions.confirmSentMessage(pendingID, data))
        , description =>
      dispatch(actions.rejectSentMessage(pendingID, roomID, description))
    );
};

