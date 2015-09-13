import User from './User';
import userGenerator from './userGenerator';
import db from './db';

const login = {
  createUser: function createUser(uid) {
    const user =  new User({
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
