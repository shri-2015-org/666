import uuid from 'uuid';
import User from '../common/User';
import Message from '../common/Message';
import * as userGenerator from './userGenerator';

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
const rooms = {};

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
  rooms[joinedRoom] = {
    ...room,
    roomUsers: {
      ...room.roomUsers,
      user: {
        secret: uuid.v4(),
        nick: userGenerator.generateName(),
        avatar: userGenerator.generateAvatar(user),
      },
    },
  };

  // return API structure
  return Promise.resolve({
    identity: {
      userID: user,
      secret: room.roomUser[user].secret,
      nick: room.roomUser[user].nick,
      avatar: room.roomUser[user].avatar,
    },
    room: {
      roomID: joinedRoom,
      name: room.roomName,
      users: Object.keys(room.roomUsers)
        .map( (key) => {
          return {
            roomID: joinedRoom,
            userID: key,
            nick: room.roomUser[key].nick,
            avatar: room.roomUser[key].avatar,
          };
        }),
    },
  });
}

