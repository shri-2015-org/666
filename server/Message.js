/**
 * Создает экземпляр Message
 * @constructor
 * @this {Message}
 * @param {Object} options - хэш с параметрами создаваемого экземпляра
 * @param {string} options.uid - идентификатор пользователя-отправителя
 * @param {string} options.text - тело сообщения
 * @param {number=} options.time - время отправки
 * @param {string=} options.read - статус прочтения
 * @param {string=} options.mid - идентификатор сообщения
 * @param {string=} options.status - статус сообщения
 */
const Message = function Message(options) {
  this.uid = options.uid;
  this.mid = options.mid;
  this.text = options.text;
  this.time = options.time || Date.now();
  this.read = options.read || false;
  this.status = options.status;
};

module.exports = Message;
