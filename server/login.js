var User = require('./User.js'),
    db = require('./db.js');

//var users = {};

var login = {
  createUser: function (uid) {
    var user =  new User({
      "name": "Some name",
      "uid": uid,
      "avatar": "Some avatar"
    });

    return db.addUser(user);
  },
  getUser: function (uid) {
    return db.getUser(uid);
  },
  getRoomUsers: function () {
    return db.getRoomUsers();
  }
};

module.exports = login;
