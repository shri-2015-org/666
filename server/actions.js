import uuid from 'uuid';
import mongoose from 'mongoose';

import * as Room from './models/Room';
import * as User from './models/User';
import * as Message from './models/Message';

import * as userGenerator from './userGenerator';

import { fetchMetas } from './open-graph';

import config from './config';

const env = process.env.NODE_ENV || 'development';
mongoose.connect(config.db[env], (err) => {
  if (err) {
    throw new Error('db connection error!');
  }
});

/**
 * Retun promise that resolve with Room instance from db or reject with error
 * @param  {String} options.roomID - room identifier
 * @return {Promise}
 */
function _getRoom(roomID) {
  return new Promise((resolve, reject) => {
    Room.model.findOne({roomID}, (err, room) => {
      if (err) {
        return reject(err);
      }
      if (!room) {
        return reject(new Error('Can not find user in unexisted room'));
      }
      resolve(room);
    });
  });
}

/**
 * Retun promise that add user to a room and resolve with hash with user data
 * @param  {Room} options.room - Room instance
 * @return {Promise}
 */
function _createUser({room, userID}) {
  return new Promise((resolve, reject) => {
    const id = uuid.v4();
    const user = new User.model({
      roomID: room.roomID,
      userID: id,
      secret: uuid.v4(),
      avatar: userGenerator.generateAvatar(id),
      nick: userGenerator.generateName(),
    });
    room.users.push(user);
    room.update({$push: {users: user}, $inc: {rating: 1}}, (err) => {
      if (err) {
        return reject(err);
      }
      resolve({user, room});
    });
  });
}

/**
 * Retun promise that get user from room and resolve with hash with user data
 * @param  {Room} options.room   - Room instance
 * @param  {String} options.userID - user identifier
 * @return {Promise}
 */
function _getUser({room, userID}) {
  return new Promise((resolve, reject) => {
    const user = room.users.filter(userEl => {
      return userEl.userID === userID;
    })[0];
    if (!user) {
      return reject(new Error('Can not find user'));
    }
    resolve({user, room});
  });
}

/**
 * Retun promise that delete user from room and resolve with hash with user data
 * @param  {Room} options.room     - Room instance
 * @param  {String} options.userID - user identifier
 * @param  {String} options.secret - user secret
 * @return {Promise}
 */
function _deleteUser({room, userID, secret}) {
  return new Promise((resolve, reject) => {
    room.update({$pull: {users: {userID, secret}, $inc: {rating: -1} }}, (err) => {
      if (err) {
        return reject(err);
      }
      resolve({roomID: room.roomID, userID});
    });
  });
}

/**
 * Retun promise that resolve with hash with message field with message data
 * @param  {Room} options.room     - Room instance
 * @param  {String} options.userID - user identifier
 * @param  {String} options.secret - user secret
 * @param  {String} options.text   - message text
 * @param  {String} options.time   - message send time
 * @return {Promise}
 */
function _createMessage({room, user, secret, text, time}) {
  return new Promise((resolve, reject) => {
    if (user.secret !== secret) {
      return reject(new Error('Wrong secret'));
    }
    const messageID = uuid.v4();
    const msg = new Message.model({
      roomID: room.roomID,
      userID: user.userID,
      messageID,
      text,
      time,
    });
    const metas = fetchMetas(text).map(metaPromise => {
      return metaPromise
        .then(({url, index, meta}) => {
          return {
            roomID: room.roomID,
            messageID,
            url,
            index,
            meta,
          };
        });
    });
    room.update({$push: {messages: msg}}, err => {
      if (err) {
        return reject(err);
      }

      resolve({data: msg, metas});
    });
  });
}

/**
 * Retun promise that resolve with new Room instance or reject with error
 * @param  {String} options.roomID - room identifier
 * @return {Promise}
 */
export function createRoom({roomID}) {
  return new Promise((resolve, reject) => {
    const room = new Room.model({roomID, name: roomID});
    room.save( (err, createdRoom) => {
      if (err) {
        return reject(err);
      }
      return resolve(createdRoom);
    });
  });
}

function _getRandomRoom() {
  return new Promise((resolve, reject) => {
    Room.model.count( (err, count) => {
      if (err) {
        return reject(err);
      }
      const rand = Math.floor(Math.random() * count);
      Room.model
        .findOne()
        .skip(rand)
        .exec( (error, room) => {
          if (error) {
            return reject(error);
          }
          if (!room) {
            return reject(new Error('Can not find user in unexisted room'));
          }
          resolve(room);
        });
    });
  });
}

/**
 * Retun promise that add user to a room and resolve with hash with user data
 * @param  {String} options.roomID - room identifier
 * @return {Promise}
 */
export function joinRoom({roomID, userID, secret}) {
  let roomMethod;
  if (!roomID) {
    roomMethod = _getRandomRoom;
  } else {
    roomMethod = _getRoom;
  }
  return roomMethod(roomID)
    .then(room => {
      let userMethod;
      if (userID && secret) {
        userMethod = _getUser;
      } else {
        userMethod = _createUser;
      }
      return userMethod({room, userID});
    })
    .then( ({user, room}) => {
      return new Promise((resolve, reject) => {
        resolve({
          identity: user,
          room: room,
        });
      });
    });
}

/**
 * Retun promise that delete user from room and resolve with hash with user data
 * @param  {String} options.roomID - room identifier
 * @param  {String} options.userID - user identifier
 * @param  {String} options.secret - user secret
 * @return {Promise}
 */
export function leaveRoom({roomID, userID, secret}) {
  return _getRoom(roomID)
    .then((room) => {
      return _deleteUser({room, userID, secret});
    });
}

/**
 * Retun promise that resolve with hash with message field with message data
 * @param  {String} options.roomID - room identifier
 * @param  {String} options.userID - user identifier
 * @param  {String} options.secret - user secret
 * @param  {String} options.text   - message text
 * @param  {String} options.time   - message send time
 * @return {Promise}
 */
export function message({roomID, userID, secret, text, time}) {
  return _getRoom(roomID)
    .then((room) => {
      return _getUser({room, userID});
    })
    .then( ({user, room}) => {
      return _createMessage({room, user, secret, text, time});
    });
}

/**
 * Retun promise that resolve with hash with rooms field with top rated rooms
 * @return {Promise}
 */
export function getTop() {
  return new Promise((resolve, reject) => {
    Room.model
      .find()
      .sort({rating: -1})
      .exec( (err, rooms) => {
        if (err) {
          return reject(err);
        }
        resolve({rooms: rooms.map( ({roomID, name, rating, users}) => {
          return {roomID, name, rating, users: users.length};
        }),
        });
      });
  });
}

/**
 * Retun promise that resolve with hash with rooms field as result of search in db by roomID
 * @param  {Object} options
 * @param  {String} options.partialRoomID - part of roomID
 * @return {Promise}
 */
export function searchRoomID({partialRoomID}) {
  return new Promise((resolve, reject) => {
    Room.model
      .find({roomID: new RegExp(partialRoomID, 'i')})
      .exec( (err, rooms) => {
        if (err) {
          return reject(err);
        }
        resolve(rooms
          .map( ({roomID, name, rating, users}) => {
            return {roomID, name, rating, users: users.length};
          })
        );
      });
  });
}
