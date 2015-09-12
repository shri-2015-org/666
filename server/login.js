var User = require('./User.js');
var userGenerator = require('./userGenerator.js'),
    db = require('./db.js');

var login = {
  createUser: function (uid) {
    var user =  new User({
      "name": userGenerator.generateName(),
      "uid": uid,
      "avatar": userGenerator.generateAvatar()
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
