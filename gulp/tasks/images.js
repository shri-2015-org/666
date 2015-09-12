var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var webp       = require('gulp-webp');
var config     = require('../config').images;

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(imagemin({
        progressive: true, // jpg
        optimizationLevel: 3 // png
    })) // Optimize
    .pipe(gulp.dest(config.dest))
    .pipe(webp({
        quality: 90
    }))
    .pipe(gulp.dest(config.dest));
});
