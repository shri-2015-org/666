var User = require('./User.js');
var userGenerator = require('./userGenerator.js');
var db = require('./db.js');

var login = {
  createUser: function createUser(uid) {
    var user =  new User({
      'name': userGenerator.generateName(),
      'uid': uid,
      'avatar': userGenerator.generateAvatar(),
    });

    return db.addUser(user);
  },
  getUser: function getUser(uid) {
    return db.getUser(uid);
  },
  getRoomUsers: function getRoomUsers() {
    return db.getRoomUsers();
  },
};

module.exports = login;
