const users = {};

/**
 * Создает promise для добавления пользователя в БД
 * @param {User}
 * @return {Promise}
 */
export function addUser(user) {
  const promise = new Promise( function onAddUser(resolve, reject) {
    if (!user) reject('Error!');

    setTimeout( function onAddUserSuccess() {
      users[user.uid] = user;
      resolve(user);
    }, 10);
  });

  return promise;
}

/**
 * Создает promise для получения пользователя из БД
 * @param  {string} userId - идентификатор пользователя
 * @return {Promise}
 */
export function getUser(userId) {
  const promise = new Promise( function onGetUser(resolve, reject) {
    if (!userId || !users[userId]) {
      reject('Error!');
      return;
    }

    setTimeout( function onGetUserSuccess() {
      resolve(users[userId]);
    }, 10);
  });

  return promise;
}

/**
 * Создает promise для получения всех пользователей
 * @return {Promise}
 */
export function getRoomUsers() {
  const promise = new Promise( function onGetRoomUsers(resolve) {
    setTimeout( function onGetRoomUsersSuccess() {
      resolve(users);
    }, 10);
  });

  return promise;
}
