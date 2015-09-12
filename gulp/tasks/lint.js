var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../config');
var path = require('path');

gulp.task('lint', function() {
    return gulp.src(path.join(process.cwd(), 'source/**/*.js'))
        .pipe(eslint())
        .pipe(eslint.format('stylish'))
        .pipe(eslint.failAfterError());
});
