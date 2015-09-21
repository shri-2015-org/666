import _ from 'lodash';

const users = {},
      unreadMessages = [],
      rooms = {},
      roomMessages = {},
      roomUsers = {};

/**
 * Создает promise для добавления пользователя в БД
 * @param user {User}
 * @return {Promise}
 */
export function addUser(user) {
  const promise = new Promise( function onAddUser(resolve, reject) {
    if (!user) {
      reject('Error!');
      return;
    }

    process.nextTick( function onAddUserSuccess() {
      users[user.uid] = user;
      resolve(user);
    });
  });

  return promise;
}

/**
 * Создает promise для получения пользователя из БД
 * @param userId {string} userId - идентификатор пользователя
 * @return {Promise}
 */
export function getUser(userId) {
  const promise = new Promise( function onGetUser(resolve, reject) {
    if (!userId || !users[userId]) {
      reject('Error!');
      return;
    }

    process.nextTick( function onGetUserSuccess() {
      resolve(users[userId]);
    });
  });

  return promise;
}

/**
 * Создает promise для получения всех пользователей
 * @return {Promise}
 */
export function getRoomUsers() {
  const promise = new Promise( function onGetRoomUsers(resolve) {
    process.nextTick( function onGetRoomUsersSuccess() {
      resolve(users);
    });
  });

  return promise;
}

/**
 * Создает promise для добавления непрочитаных сообщений в список непрочитанны сообщений
 * @param message {Message}
 * @return {Promise}
 */
export function addUnreadMessage(message) {
  const promise = new Promise( function onAddUnreadMessage(resolve, reject) {
    if (!message || !message.uid) {
      reject('Error!');
      return;
    }

    process.nextTick( function onAddUnreadMessageSuccess() {
      unreadMessages.push(message);
      console.log(unreadMessages);
      resolve(message);
    });
  });

  return promise;
}

/**
 * Создает promise для удаления прочитанных сообщений из списка непрочитанных
 * @param mid {string} mid - идентификатор сообщения
 * @return {Promise}
 */
export function readMessage(mid) {
  const promise = new Promise( function onReadMessage(resolve) {
    if (!mid) {
      reject('Error!');
      return;
    }

    process.nextTick( function onGetUserSuccess() {
      const message = _.remove(unreadMessages, function checkMessageForRemove(el) {
        return el.mid === mid;
      });
      console.log(message);
      resolve(message);
    });
  });

  return promise;
}

/**
 * Создает promise для добавления комнаты
 * @param room {Room}
 * @return {Promise}
 */
export function addRoom(room) {
  const promise = new Promise( function onAddRoom(resolve, reject) {
    if (!room) {
      reject('Error!');
      return;
    }

    process.nextTick( function onAddRoomSuccess() {
      rooms[room.rid] = room;
      resolve(room);
    });
  });

  return promise;
}

/**
 * Создает promise для получения комнаты
 * @param roomId {string} roomId - идентификатор комнаты
 * @return {Promise}
 */
export function getRoom(roomId) {
  const promise = new Promise( function onGetRoom(resolve, reject) {
    if (!roomId || !rooms[roomId]) {
      reject('Error!');
      return;
    }

    process.nextTick( function onGetRoomSuccess() {
      resolve(rooms[roomId]);
    });
  });

  return promise;
}

/**
 * Создает promise для получения всех комнат
 * @return {Promise}
 */
export function getAllRooms() {
  const promise = new Promise( function onGetAllRoom(resolve) {
    process.nextTick( function onGetAllRoomSuccess() {
      resolve(rooms);
    });
  });

  return promise;
}

/**
 * Создает promise для удаления комнаты
 * @param room {Room}
 * @return {Promise}
 */
export function removeRoom(room) {
  const promise = new Promise( function onRemoveRoom(resolve, reject) {
    if (!room) {
      reject('Error!');
      return;
    }

    process.nextTick( function onRemoveRoomSuccess() {
      delete rooms[room.rid];
      resolve(room);
    });
  });

  return promise;
}

/**
 * Создает promise для добавления сообщений в комнаты
 * @param mid {mid}
 * @return {Promise}
 */
export function addIdMessage(mid) {
  const promise = new Promise( function onAddIdMessage(resolve, reject) {
    if (!mid || !roomMessages[mid]) {
      reject('Error!');
      return;
    }

    process.nextTick( function onAddIdMessageSuccess() {
      roomMessages[mid] = mid;
      resolve(roomMessages);
    });
  });

  return promise;
}

/**
 * Создает promise для получения всех сообщений в комнате
 * @return {Promise}
 */
export function getIdMessages() {
  const promise = new Promise( function onGetMessages(resolve) {
    process.nextTick( function onGetMessagesSuccess() {
      resolve(roomMessages);
    });
  });

  return promise;
}

/**
 * Создает promise для добавления пользователей в комнаты
 * @param uid {uid}
 * @return {Promise}
 */
export function addIdUser(uid) {
  const promise = new Promise( function onAddIdUser(resolve, reject) {
    if (!uid || !roomUsers[uid]) {
      reject('Error!');
      return;
    }

    process.nextTick( function onAddIdUserSuccess() {
      roomUsers[uid] = uid;
      resolve(roomUsers);
    });
  });

  return promise;
}

/**
 * Создает promise для получения всех пользователй в комнате
 * @return {Promise}
 */
export function getIdUsers() {
  const promise = new Promise( function onGetUsers(resolve) {
    process.nextTick( function onGetUsersSuccess() {
      resolve(roomUsers);
    });
  });

  return promise;
}
