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
 */
const Message = function Message(options) {
  this.uid = options.uid;
  this.text = options.text;
  this.time = options.time || Date.now();
  this.read = options.read || false;
  this.mid = options.mid || this.uid + this.time;
};

module.exports = Message;
