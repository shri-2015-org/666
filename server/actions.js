import uuid from 'uuid';
import mongoose from 'mongoose';
import _ from 'lodash';

import * as Room from './models/Room';
import * as User from './models/User';
import * as Message from './models/Message';

import * as userGenerator from './userGenerator';

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

function _getRoom({roomID, userID, secret, text, time}) {
  return new Promise((resolve, reject) => {
    Room.model.findOne({roomID}, (err, room) => {
      if (err) {
        return reject(err);
      }
      if (!room) {
        return reject(new Error('Can not find user in unexisted room'));
      }
      resolve({room, userID, secret, text, time});
    });
  });
}

function _createUser({room}) {
  return new Promise((resolve, reject) => {
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

function _saveUser({user, room}) {
  return new Promise((resolve, reject) => {
    room.users.push(user);
    room.save(err => {
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
    .then(_saveUser);
}

function _getUser({room, userID, secret, text, time}) {
  return new Promise((resolve, reject) => {
    const user = room.users.filter(userEl => {
      return userEl.userID === userID;
    })[0];
    if (!user) {
      return reject(new Error('Can not find user'));
    }
    resolve({room, user, secret, text, time});
  });
}

function _deleteUser({room, userID, secret}) {
  return new Promise((resolve, reject) => {
    const user = room.users.filter(userEl => {
      return userEl.userID === userID && userEl.secret === secret;
    })[0];
    room.users.remove(user);
    room.save(err => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
}

export function leaveRoom({roomID, userID, secret}) {
  return _getRoom({roomID, userID, secret})
    .then(_deleteUser);
}

function _createMessage({room, user, secret, text, time}) {
  return new Promise((resolve, reject) => {
    if (user.secret !== secret) {
      return reject(new Error('Wrong secret'));
    }
    const msg = new Message.model({
      roomID: room.roomID,
      userID: user.userID,
      messageID: uuid.v4(),
      text: text,
      time: time,
    });
    msg.save( (err, savedMessage) => {
      if (err) {
        return reject(err);
      }
      resolve({ room, user, savedMessage });
    });
  });
}

function _saveMessage({room, user, savedMessage}) {
  return new Promise((resolve, reject) => {
    room.messages.push(savedMessage);
    room.save(err => {
      if (err) {
        return reject(err);
      }
      resolve(savedMessage);
    });
  });
}

export function message({roomID, userID, secret, text, time}) {
  return _getRoom({roomID, userID, secret, text, time})
    .then(_getUser)
    .then(_createMessage)
    .then(_saveMessage);
}

export function getTop() {
  return new Promise((resolve, reject) => {
    Room.model
      .find({rating: 0})
      .sort({rating: -1})
      .exec( (err, rooms) => {
        if (err) {
          return reject(err);
        }
        resolve({rooms});
      });
  });
}

export function searchRoomID({partialRoomID}) {
  return new Promise((resolve, reject) => {
    Room.model
      .find({roomID: new RegExp(partialRoomID, 'i')})
      .exec( (err, rooms) => {
        if (err) {
          return reject(err);
        }
        resolve({rooms});
      });
  });
}
