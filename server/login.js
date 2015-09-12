var User = require('./User.js');

var users = {};

var login = {
  createUser: function (uid) {
    var user =  new User({
      "name": "Some name",
      "uid": uid,
      "avatar": "Some avatar"
    });

    users[uid] = user;
    return user.toJSON();
  },
  getUser: function (uid) {
    return users[uid];
  },
  getRoomUsers: function () {
    return users;
  }
};

module.exports = login;
