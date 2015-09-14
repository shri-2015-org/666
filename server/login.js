import User from './User';
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
