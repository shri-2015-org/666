import User from './User';
import Message from './Message';
import * as userGenerator from './userGenerator';
import * as db from './db';

/**
 * Создает нового пользователя и добавляет его в БД
 * @param  {string} uid - идентификатор пользователя
 * @return {User}
 */
export function createUser(uid) {
  const user =  new User({
    'name': userGenerator.generateName(),
    'uid': uid,
    'avatar': userGenerator.generateAvatar(uid),
  });
  return db.addUser(user);
}

/**
 * Получает пользователя из БД
 * @param  {string} uid - идентификатор пользователя
 * @return {User}
 */
export function getUser(uid) {
  return db.getUser(uid);
}

/**
 * Получает всех пользователей
 * @return {User[]}
 */
export function getRoomUsers() {
  return db.getRoomUsers();
}

/**
 * Добавляет id сообщения в список непрочитанных
 * @param {Object} data
 * @param {string} data.uid - идентификатор пользователя-отправителя
 */
export function addUnreadMessage(data) {
  const message = new Message(data);
  return db.addUnreadMessage(message);
}

/**
 * Удаляет сообщение из списока непрочитанных
 * @param  {string} идентификатор сообщения
 */
export function readMessage(mid) {
  return db.readMessage(mid);
}
