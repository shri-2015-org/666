/**
 * Создает экземпляр User
 * @constructor
 * @this {User}
 * @param {Object} options - хэш с параметрами создаваемого экземпляра
 * @param {string} options.name - имя пользователя
 * @param {string} options.avatar - аватар пользователя в hex d в формате '#FFFFFF'
 * @param {string} options.uid - идентификатор пользователя
 */
const User = function User(options) {
  this.name = options.name;
  this.avatar = options.avatar;
  this.uid = options.uid;
};

module.exports = User;
