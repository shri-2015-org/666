import uuid from 'uuid';
import User from '../../common/User';
import Message from '../../common/Message';
import * as userGenerator from '../userGenerator';
import _ from 'lodash';

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
    }],
    rating: number,
  })
*/
// mock start data
const rooms = {
  '1289f58a-418d-4b6d-88e9-071418aa62e3': {
    roomName: 'Main room',
    roomUsers: {
      '8cc4dc0b-8263-49d7-90dd-15551913462d': {
        secret: '48cdbbb9-5e8a-403f-9104-e5ed66019a41',
        nick: 'Anonym',
        avatar: 'media/plane.svg',
      },
    },
    roomMessages: [],
    rating: 0,
  },
};

export function joinRoom({roomID}) {
  if (roomID && !rooms.hasOwnProperty(roomID)) {
    return Promise.reject('No room is found');
  }

  const roomKeys = Object.keys(rooms);
  const user = uuid.v4();
  const joinedRoom = roomID ? roomID :
    roomKeys[Math.floor(Math.random() * roomKeys.length)];
  const room = rooms[joinedRoom];

  // room mutation
  room.roomUsers[user] = {
    secret: uuid.v4(),
    nick: userGenerator.generateName(),
    avatar: userGenerator.generateAvatar(user),
  };

  // return API structure
  return Promise.resolve({
    identity: {
      userID: user,
      secret: room.roomUsers[user].secret,
      nick: room.roomUsers[user].nick,
      avatar: room.roomUsers[user].avatar,
    },
    room: {
      roomID: joinedRoom,
      name: room.roomName,
      users: Object.keys(room.roomUsers)
        .map( (key) => {
          return {
            roomID: joinedRoom,
            userID: key,
            nick: room.roomUsers[key].nick,
            avatar: room.roomUsers[key].avatar,
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

  // room mutation
  room.roomMessages.push({
    userID,
    messageID,
    text,
    time,
  });

  // return API structure
  return Promise.resolve({
    roomID,
    userID,
    messageID,
    text,
    time,
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

  return _(roomIDs)
    .filter(roomID => _.startsWith(roomID, partialRoomID))
    .sort()
    .take(5)
    .map(roomID => {
      const room = rooms[roomID];
      return {
        roomID,
        name: room.roomName,
        rating: room.rating,
        users: room.roomUsers.length,
      };
    });
}
