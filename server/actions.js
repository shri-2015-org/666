import uuid from 'uuid';
import User from '../common/User';
import Message from '../common/Message';
import * as ERRORS from '../common/ERRORS';
import * as userGenerator from './userGenerator';
import * as db from './db';

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

/**
 * Создает Promise для добавления пользователя в комнату
 * @param  {Object} data - хэш с параметрами
 * @param  {String} data.roomID - идентификатор комнаты
 * @return {Promise}
 */
export function joinRoom(data) {
  const promise = new Promise( (resolve, reject) => {
    switch (true) {
      case !data:
        reject(ERRORS.API.JOIN_ROOM.EMPTY_DATA);
        break;
      case data.roomID === undefined: // check falsy values on next case
        reject(ERRORS.API.JOIN_ROOM.EMPTY_ROOM_ID);
        break;
      case typeof data.roomID !== 'string':
        reject(ERRORS.API.JOIN_ROOM.INVALID_ROOM_ID);
        break;
      case !rooms.hasOwnProperty(data.roomID): // TODO implement
        reject(ERRORS.API.JOIN_ROOM.DEFUNCT_ROOM);
        break;
      default:
        setTimeout( () => {
          const user = {
            roomID: data.roomID,
            userID: 'userID',
            nick: 'nick',
            avatar: 'avatar',
          };
          resolve(user);
        }, 10);
    }
  });

  return promise;
}

/**
 * Создает Promise для удаления пользователя из комнаты
 * @param  {Object} data - хэш с параметрами
 * @param  {String} data.roomID - идентификатор комнаты
 * @param  {String} data.userID - идентификатор пользователя
 * @param  {String} data.secret - секрет для проверки пользователя
 * @return {Promise}
 */
export function leaveRoom(data) {
  const promise = new Promise( (resolve, reject) => {
    switch (true) {
      case !data:
        reject(ERRORS.API.LEAVE_ROOM.EMPTY_DATA);
        break;
      case data.roomID === undefined:
        reject(ERRORS.API.LEAVE_ROOM.EMPTY_ROOM_ID);
        break;
      case data.userID === undefined:
        reject(ERRORS.API.LEAVE_ROOM.EMPTY_USER_ID);
        break;
      case data.secret === undefined:
        reject(ERRORS.API.LEAVE_ROOM.EMPTY_SECRET);
        break;
      case typeof data.roomID !== 'string':
        reject(ERRORS.API.LEAVE_ROOM.INVALID_ROOM_ID);
        break;
      case typeof data.userID !== 'string':
        reject(ERRORS.API.LEAVE_ROOM.INVALID_USER_ID);
        break;
      case typeof data.secret !== 'string':
        reject(ERRORS.API.LEAVE_ROOM.INVALID_SECRET);
        break;
      case !rooms.hasOwnProperty(data.roomID): // TODO implement
        reject(ERRORS.API.LEAVE_ROOM.DEFUNCT_ROOM);
        break;
      case !rooms[data.roomID].roomUsers.hasOwnProperty(data.userID): // TODO implement
        reject(ERRORS.API.LEAVE_ROOM.DEFUNCT_USER);
        break;
      case rooms[data.roomID].roomUsers[data.userID].secret !== data.secret: // TODO implement
        reject(ERRORS.API.LEAVE_ROOM.WRONG_SECRET);
        break;
      default:
        setTimeout( () => {
          resolve({
            roomID: data.roomID,
            userID: data.userID,
          });
        }, 10);
    }
  });

  return promise;
}

/**
 * Создает Promise для отправки сообщения
 * @param  {Object} data - хэш с параметрами
 * @param  {String} data.roomID - идентификатор комнаты
 * @param  {String} data.userID - идентификатор пользователя
 * @param  {String} data.secret - секрет для проверки пользователя
 * @param  {String} data.text - текст сообщения
 * @param  {String} data.time - клиентское время отправки сообщения
 * @return {Promise}
 */
export function message(data) {
  const promise = new Promise( (resolve, reject) => {
    switch (true) {
      case !data:
        reject(ERRORS.API.MESSAGE.EMPTY_DATA);
        break;
      case data.roomID === undefined:
        reject(ERRORS.API.MESSAGE.EMPTY_ROOM_ID);
        break;
      case data.userID === undefined:
        reject(ERRORS.API.MESSAGE.EMPTY_USER_ID);
        break;
      case data.secret === undefined:
        reject(ERRORS.API.MESSAGE.EMPTY_SECRET);
        break;
      case data.text === undefined:
        reject(ERRORS.API.MESSAGE.EMPTY_TEXT);
        break;
      case data.time === undefined:
        reject(ERRORS.API.MESSAGE.EMPTY_TIME);
        break;
      case typeof data.roomID !== 'string':
        reject(ERRORS.API.MESSAGE.INVALID_ROOM_ID);
        break;
      case typeof data.userID !== 'string':
        reject(ERRORS.API.MESSAGE.INVALID_USER_ID);
        break;
      case typeof data.secret !== 'string':
        reject(ERRORS.API.MESSAGE.INVALID_SECRET);
        break;
      case typeof data.text !== 'string':
        reject(ERRORS.API.MESSAGE.INVALID_TEXT);
        break;
      case typeof data.time !== 'number':
        reject(ERRORS.API.MESSAGE.INVALID_TIME);
        break;
      case !rooms.hasOwnProperty(data.roomID): // TODO implement
        reject(ERRORS.API.MESSAGE.DEFUNCT_ROOM);
        break;
      case !rooms[data.roomID].roomUsers.hasOwnProperty(data.userID): // TODO implement
        reject(ERRORS.API.MESSAGE.DEFUNCT_USER);
        break;
      case rooms[data.roomID].roomUsers[data.userID].secret !== data.secret: // TODO implement
        reject(ERRORS.API.MESSAGE.WRONG_SECRET);
        break;
      default:
        const messageID = uuid.v4();
        const serverTime = Date.now();
        // TODO add message to db here
        setTimeout( () => {
          resolve({
            roomID: data.roomID,
            userID: data.userID,
            messageID: messageID,
            text: data.text,
            time: serverTime,
          });
        }, 10);
    }
  });

  return promise;
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
