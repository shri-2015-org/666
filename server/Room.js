/**
 * Создает экземпляр Room
 * @constructor
 * @this {Room}
 * @param {Object} options - объект с параметрами
 * @param {string} options.rid - идентификатор комнаты
 * @param {string} options.name - название комнаты
 * @param {string} options.timeCreate - время создания комнаты
 * @param {string} options.timeLength - время жизни комнаты
 */
const Room = function Room(options) {
  this.rid = options.rid;
  this.name = options.name;
  this.timeCreate = options.timeCreate;
  this.timeDeath = options.timeDeath;
  this.timeLength = options.timeLength;
  this.listMessage = {};
  this.listUsers = {};
};

module.exports = Room;
