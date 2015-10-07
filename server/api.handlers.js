import actions from './mock/wrapper';

export const topRooms = () => actions.getTop()
  .then(data => {
    return {
      type: 'broadcast',
      data,
    };
  });

const createRoom = request => () => actions.createRoom(request)
  .then(() => {
    return [{
      type: 'exchange',
    }];
  });

const joinRoom = request => () => actions.joinRoom(request)
  .then(({room, identity}) => {
    const { roomID } = room;
    const { userID, nick, avatar } = identity;
    const channel = `room:${room.roomID}`;

    return [{
      type: 'exchange',
      data: {
        room,
        identity,
      },
    }, {
      type: 'join',
      channel,
    }, {
      type: 'roomcast',
      channel,
      data: {
        roomID,
        userID,
        nick,
        avatar,
      },
    },
    topRooms(),
    ];
  });

const leaveRoom = request => () => actions.leaveRoom(request)
  .then(({roomID, userID}) => {
    const channel = `room:${roomID}`;

    return [{
      type: 'exchange',
    }, {
      type: 'leave',
      channel,
    }, {
      type: 'roomcast',
      channel,
      data: {
        roomID,
        userID,
      },
    },
    topRooms(),
    ];
  });

const message = request => () => actions.message(request)
  .then(data => {
    const {roomID} = data;
    const channel = `room:${roomID}`;

    return [{
      type: 'exchange',
      data,
    }, {
      type: 'roomcast',
      channel,
      data,
    }];
  });

const searchRoomID = request => () => actions.searchRoomID(request)
  .then(data => {
    return [{
      type: 'exchange',
      data,
    }];
  });

export const handlers = {
  createRoom,
  joinRoom,
  leaveRoom,
  message,
  searchRoomID,
};

