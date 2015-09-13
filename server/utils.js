const utils = {
  genRandomFloorBetween: function genRandomFloorBetween(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  },
  getRandomFromArray: function getRandomFromArray(arr) {
    return arr[utils.genRandomFloorBetween(0, arr.length - 1)];
  },
  removeFromArray: function removeFromArray(el, arr) {
    const index = arr.indexOf(el);
    if (index > -1) {
      arr.splice(index, 1);
    }
  },
};

module.exports = utils;
