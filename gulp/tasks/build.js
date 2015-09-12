var gulp  = require('gulp');

gulp.task('build', ['lint', 'images', 'webpack:build', 'incVersion', 'commit']);
