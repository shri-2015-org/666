var users = {};

module.exports = {
  addUser: function (user) {
    var promise = new Promise(function (resolve, reject) {
      if (!user) reject('Error!');

      setTimeout(function () {
        users[user.uid] = user;
        resolve(user);
      }, 10);
    });

    return promise;
  },
  getUser: function (userId) {
    var promise = new Promise(function (resolve, reject) {
      if (!userId || !users[userId]){
        reject("Error!");
        return;
      }

      setTimeout(function () {
        resolve(users[userId]);
      }, 10);
    });

    return promise;
  },
  getRoomUsers: function () {
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(users);
      }, 10);
    });

    return promise;
  }
};