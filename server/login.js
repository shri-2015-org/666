var User = require('./User.js');
var userGenerator = require('./userGenerator.js');

var users = {};

var login = {
  createUser: function (uid) {
    var user =  new User({
      "name": userGenerator.generateName(),
      "uid": uid,
      "avatar": userGenerator.generateAvatar()
    });

    users[uid] = user;
    return user;
  },
  getUser: function (uid) {
    return users[uid];
  },
  getRoomUsers: function () {
    return users;
  }
};

module.exports = login;
