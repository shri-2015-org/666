var gulp = require('gulp');
var config = require('../config').files;

gulp.task('build', ['static', 'lint', 'images', 'webpack:build', 'incVersion', 'commit']);

gulp.task('static', function() {
  return gulp.src(config.src, { base: config.stat })
             .pipe(gulp.dest(config.dest));
});

