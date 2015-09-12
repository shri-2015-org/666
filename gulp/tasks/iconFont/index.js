const gulp             = require('gulp');
const iconfont         = require('gulp-iconfont');
const config           = require('../../config').iconFonts;
const generateIconScss = require('./generateIconScss');

gulp.task('iconsFont', function() {
  return gulp.src(config.src)
    .pipe(iconfont(config.options))
    .on('codepoints', generateIconScss)
    .pipe(gulp.dest(config.dest));
});
