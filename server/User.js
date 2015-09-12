var User = function (options) {
  this.name = options.name;
  this.avatar = options.avatar;
  this.uid = options.uid;
};

User.prototype.toJSON = function () {
  return JSON.stringify({
    name: this.name,
    avatar: this.avatar,
    uid: this.uid
  });
};

module.exports = User;
