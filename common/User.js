/**
 * Создает экземпляр User
 * @class
 * @this {User}
 * @param {Object} options - хэш с параметрами создаваемого экземпляра
 * @param {string} options.name - имя пользователя
 * @param {string} options.avatar - аватар пользователя в hex d в формате '#FFFFFF'
 * @param {string} options.uid - идентификатор пользователя
 */
export default class User {
  constructor(options) { // TODO обработка недостающих полей?
    this.name = options.name;
    this.avatar = options.avatar;
    this.uid = options.uid;
  }
}
