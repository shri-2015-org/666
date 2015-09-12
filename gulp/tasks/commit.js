const gulp = require('gulp');
const git = require('gulp-git');
const tagVersion = require('gulp-tag-version');
const path = require('path');
const gutil = require('gulp-util');
const message = require('yargs').argv.m;

gulp.task('commit', ['incVersion'], function() {

    if (global.noImportance) {
        gutil.log(gutil.colors.red.bold('[commit]: No importance argument. Autocommit skipped'));
        return gutil.noop();
    }

    if (! message) {
        gutil.log(gutil.colors.red.bold('[commit]: No message argument. Autocommit skipped'));
        return gutil.noop();
    }

    const version = require(process.cwd() + '/package.json').version;

    return gulp.src([ path.join(process.cwd(), '../') ])
        .pipe(git.add({args: '--all'}))
        .pipe(git.commit(message))
        .pipe(tagVersion({version: version}));
});
