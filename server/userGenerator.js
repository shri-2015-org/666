var FIRST = ['Limited', 'Endless', 'Orange', 'Blue', 'Swollen', 'Horrible', 'Great', 'Awesome', 'Terrible', 'Idiotic', 'Massive', 'Cheesy'];
var LAST = ['Peppermints', 'Oil', 'Dragon', 'Cafeteria', 'Junkie', 'Vegetables', 'Twinkies', 'Turtle', 'Fox', 'Calculator', 'Bandwidth', 'Crust', 'Cake', 'Derp'];
var COLORS =  ['#DE3404', '#E68210', '#BFBF0A', '#1D9608', '#24BD09', '#10DE81', '#10C2DE', '#07B0AD', '#0C56A6', '#C215BF', '#8B1AD6'];

function genRandomFloorBetween(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function getRandomFromArray(arr) {
  return arr[genRandomFloorBetween(0, arr.length - 1)];
}

userGenerator = {
  generateName: function() {
    var first = getRandomFromArray(FIRST);
    var last = getRandomFromArray(LAST);
    return first + ' ' + last;
  },
  generateAvatar: function() {
    return getRandomFromArray(COLORS);
  },
};

module.exports = userGenerator;
