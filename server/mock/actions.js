import uuid from 'uuid';
import User from '../../common/User';
import Message from '../../common/Message';
import * as userGenerator from '../userGenerator';
import _ from 'lodash';
import validRoomID from '../../common/RoomID';
import { fetchMetas } from '../open-graph';

/*
  rooms: HashMap('roomID', {
    roomName: string,
    roomUsers: HashMap('userID', {
      avatar: string,
      nick: string,
      secret: string,
    }),
    roomMessages: [{
      userID: string,
      messageID: string,
      text: string,
      time: number,
      attachments: HashMap('url', any),
    }],
    rating: number,
  })
*/
// mock start data
const fakeUsers = {
  '8cc4dc0b-8263-49d7-90dd-15551913462d': {
    secret: '48cdbbb9-5e8a-403f-9104-e5ed66019a41',
    nick: 'Anonym',
    avatar: 'media/plane.svg',
  },
};

const rooms = {
  'lobby': {
    roomName: 'The place where the universe begins.',
    roomUsers: {}, // fakeUsers,
    roomMessages: [],
    rating: 0,
  },
  'doctor': {
    roomName: 'Medical topics.',
    roomUsers: {},
    roomMessages: [],
    rating: 5,
  },
  'doge': {
    roomName: 'Industrial dogecoin mining operations.',
    roomUsers: {},
    roomMessages: [],
    rating: 1,
  },
};

export function createRoom({roomID}) {
  if (!validRoomID(roomID)) {
    return Promise.reject('Room ID is not valid.');
  }

  if (rooms.hasOwnProperty(roomID)) {
    return Promise.reject('Room exists.');
  }

  rooms[roomID] = {
    roomName: 'This is a brand new room.',
    roomUsers: [],
    roomMessages: [],
    rating: 0,
  };

  return Promise.resolve();
}

export function joinRoom({roomID, userID, secret}) {
  if (roomID && !rooms.hasOwnProperty(roomID)) {
    return Promise.reject('No room is found');
  }

  const roomKeys = Object.keys(rooms);
  const randomRoom = roomKeys[Math.floor(Math.random() * roomKeys.length)];
  const joinedRoom = roomID ? roomID : randomRoom;
  const room = rooms[joinedRoom];
  const roomUsers = room.roomUsers;

  let user;
  if (userID) {
    if (!roomUsers.hasOwnProperty(userID)) {
      return Promise.reject('Your user is not found in this room');
    }
    if (roomUsers[userID].secret !== secret) {
      return Promise.reject('Your secret is wrong');
    }

    user = userID;
  } else {
    user = uuid.v4();

    // room mutation
    roomUsers[user] = {
      secret: uuid.v4(),
      nick: userGenerator.generateName(),
      avatar: userGenerator.generateAvatar(user),
    };
  }

  // return API structure
  return Promise.resolve({
    identity: {
      userID: user,
      secret: roomUsers[user].secret,
      nick: roomUsers[user].nick,
      avatar: roomUsers[user].avatar,
    },
    room: {
      roomID: joinedRoom,
      name: room.roomName,
      users: Object.keys(roomUsers)
        .map( (key) => {
          return {
            roomID: joinedRoom,
            userID: key,
            nick: roomUsers[key].nick,
            avatar: roomUsers[key].avatar,
          };
        }),
    },
  });
}

export function leaveRoom({roomID, userID, secret}) {
  if (!roomID || !rooms.hasOwnProperty(roomID)) {
    return Promise.reject('No room is found');
  }

  const users = rooms[roomID].roomUsers;

  if (!users.hasOwnProperty(userID)) {
    return Promise.reject('Your userID is wrong');
  }
  if (users[userID].secret !== secret) {
    return Promise.reject('Your secret is wrong');
  }

  // room mutation
  delete users[userID];

  // return API structure
  return Promise.resolve({
    roomID,
    userID,
  });
}

export function message({roomID, userID, secret, text, time}) {
  if (roomID && !rooms.hasOwnProperty(roomID)) {
    return Promise.reject('No room is found');
  }

  const room = rooms[roomID];
  const users = room.roomUsers;

  if (!users.hasOwnProperty(userID)) {
    return Promise.reject('Your userID is wrong');
  }
  if (users[userID].secret !== secret) {
    return Promise.reject('Your secret is wrong');
  }

  const messageID = uuid.v4();

  const attachments = {};

  // room mutation
  room.roomMessages.push({
    userID,
    messageID,
    text,
    time,
    attachments,
  });

  const metas = fetchMetas(text).map(fetchMeta => {
    return fetchMeta
      .then(({url, index, meta}) => {
        attachments[url] = meta;
        return {
          roomID,
          messageID,
          url,
          index,
          meta,
        };
      });
  });

  // return API structure
  return Promise.resolve({
    data: {
      roomID,
      userID,
      messageID,
      text,
      time,
    },
    metas,
  });
}

export function getTop() {
  const topRooms = Object.keys(rooms)
    .map((key) => {
      const room = rooms[key];
      return {
        roomID: key,
        name: room.roomName,
        users: Object.keys(room.roomUsers).length,
        rating: room.rating,
      };
    });

  // return all rooms
  return Promise.resolve({
    rooms: topRooms,
  });
}

export function searchRoomID({partialRoomID}) {
  const roomIDs = Object.keys(rooms);

  return Promise.resolve(
    _(roomIDs)
    .filter(roomID => _.startsWith(roomID, partialRoomID))
    .sort()
    .take(5)
    .map(roomID => {
      const room = rooms[roomID];
      return {
        roomID,
        name: room.roomName,
        rating: room.rating,
        users: Object.keys(room.roomUsers).length,
      };
    })
  );
}
