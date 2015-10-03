import uuid from 'uuid';
import mongoose from 'mongoose';
import _ from 'lodash';

import * as Room from './models/Room';
import * as User from './models/User';

import config from './config';
import * as userGenerator from './userGenerator';

// const db = mongoose.createConnection(config.development);

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
    roomUsers: [], // fakeUsers,
    roomMessages: [],
    rating: 0,
  },
  'doctor': {
    roomName: 'Medical topics.',
    roomUsers: [],
    roomMessages: [],
    rating: 5,
  },
  'doge': {
    roomName: 'Industrial dogecoin mining operations.',
    roomUsers: [],
    roomMessages: [],
    rating: 1,
  },
};

export function createRoom({roomID}) {
  return new Promise((resolve, reject) => {
    const room = new Room.model({roomID});
    room.save( (err, createdRoom) => {
      if (err) {
        return reject(err);
      }
      return resolve(createdRoom);
    });
  });
}

function _getRoom({roomID}) {
  return new Promise((resolve, reject) => {
    Room.model.findOne({roomID}, (err, room) => {
      if (err) {
        return reject(err);
      }
      resolve(room);
    });
  });
}

function _createUser(room) {
  return new Promise((resolve, reject) => {
    if (!room) {
      return reject(new Error('Can not create user in unexisted room'));
    }
    const userID = uuid.v4();
    const user = new User.model({
      roomID: room.roomID,
      userID: userID,
      secret: uuid.v4(),
      avatar: userGenerator.generateAvatar(userID),
      nick: userGenerator.generateName(),
    });
    user.save( (err, createdUser) => {
      if (err) {
        return reject(err);
      }
      resolve({user, room});
    });
  });
}

function _addUser({user, room}) {
  return new Promise((resolve, reject) => {
    room.users.push(user);
    room.save((err) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
}

export function joinRoom({roomID}) {
  return _getRoom({roomID})
    .then(_createUser)
    .then(_addUser);
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
