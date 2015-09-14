const users = {};

module.exports = {
  addUser: function addUser(user) {
    const promise = new Promise( function onAddUser(resolve, reject) {
      if (!user) reject('Error!');

      setTimeout( function onAddUserSuccess() {
        users[user.uid] = user;
        resolve(user);
      }, 10);
    });

    return promise;
  },
  getUser: function getUser(userId) {
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
  },
  getRoomUsers: function getRoomUsers() {
    const promise = new Promise( function onGetRoomUsers(resolve) {
      setTimeout( function onGetRoomUsersSuccess() {
        resolve(users);
      }, 10);
    });

    return promise;
  },
};
