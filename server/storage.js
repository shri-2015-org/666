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
  const user = new User({
    'name': userGenerator.generateName(),
    'uid': uid,
    'avatar': userGenerator.generateAvatar(),
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

/**
 * Создает новую комнату и добавляет её в БД
 * @param {string} rid - идентификатор комнаты
 * @param {string} name - название комнаты
 * @param {string} timeCreate - время создания комнаты
 * @param {string} timeLength - время жизни комнаты
 * @return {Room}
 */
export function createRoom(rid, name, timeCreate, timeLength) {
  const room =  new Room({
    'rid': rid,
    'name': name,
    'timeCreate': timeCreate,
    'timeDeath': timeLength,
    'timeLength': timeLength
  });
  return db.addRoom(room);
}

/**
 * Получает пользователя из БД
 * @param  {string} rid - идентификатор комнаты
 * @return {Room}
 */
export function getRoom(rid) {
  return db.getRoom(rid);
}

/**
 * Получает все комнаты
 * @return {rooms}
 */
export function getAllRooms() {
  return db.getAllRooms();
}
