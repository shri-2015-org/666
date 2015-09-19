import _ from 'lodash';

const FIRST = ['Limited', 'Endless', 'Orange', 'Blue', 'Swollen', 'Horrible', 'Great', 'Awesome', 'Terrible', 'Idiotic', 'Massive', 'Cheesy'];
const LAST = ['Peppermints', 'Oil', 'Dragon', 'Cafeteria', 'Junkie', 'Vegetables', 'Twinkies', 'Turtle', 'Fox', 'Calculator', 'Bandwidth', 'Crust', 'Cake', 'Derp'];

function _generateUrl(uid) {
  const gender = _.sample(['male', 'female']);
  return `http://eightbitavatar.herokuapp.com/?id=${uid}&s=${gender}&size=64`;
}
/**
 * Генерирует имя пользователя
 * @return {string}
 */
export function generateName() {
  return _.sample(FIRST) + ' ' + _.sample(LAST);
}

/**
 * Генерирует аватар пользователя в hex в формате '#FFFFFF'
 * @return {string}
 */
export function generateAvatar(uid) {
  return _generateUrl(uid);
}
