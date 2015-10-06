import uuid from 'uuid';
import mongoose from 'mongoose';
import _ from 'lodash';

import * as Room from './models/Room';
import * as User from './models/User';
import * as Message from './models/Message';

import * as userGenerator from './userGenerator';

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
function _createUser(room) {
  return new Promise((resolve, reject) => {
    const userID = uuid.v4();
    const user = new User.model({
      roomID: room.roomID,
      userID: userID,
      secret: uuid.v4(),
      avatar: userGenerator.generateAvatar(userID),
      nick: userGenerator.generateName(),
    });
    room.update({$push: {users: user}, $inc: {rating: 1}}, err => {
      if (err) {
        return reject(err);
      }
      resolve(user);
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
    resolve(user);
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
    const msg = new Message.model({
      roomID: room.roomID,
      userID: user.userID,
      messageID: uuid.v4(),
      text: text,
      time: time,
    });
    room.update({$push: {messages: msg}}, err => {
      if (err) {
        return reject(err);
      }
      resolve(msg);
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
    const room = new Room.model({roomID});
    room.save( (err, createdRoom) => {
      if (err) {
        return reject(err);
      }
      return resolve(createdRoom);
    });
  });
}

/**
 * Retun promise that add user to a room and resolve with hash with user data
 * @param  {String} options.roomID - room identifier
 * @return {Promise}
 */
export function joinRoom({roomID}) {
  return _getRoom(roomID)
    .then(_createUser);
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
      console.log(room);
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
  let resolvedRoom;
  return _getRoom(roomID)
    .then((room) => {
      resolvedRoom = room;
      return _getUser({room, userID});
    })
    .then(user => {
      return _createMessage({room: resolvedRoom, user, secret, text, time});
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
        resolve({rooms});
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
        resolve({rooms});
      });
  });
}
