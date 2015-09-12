/**
 * MANIFEST
 *
 * -p --patch - patch version increment
 * --minor - minor version increment
 * --major - major version increment
 *
 * read more here
 * http://semver.org/
 */

const gulp = require('gulp');
const bump = require('gulp-bump');
const gutil = require('gulp-util');
const argv = require('yargs').alias('p', 'patch').alias('m', 'minor').argv;

var importance;

global.noImportance = false;

gulp.task('incVersion', ['webpack:build'], function() {
    if (argv.p) {
        importance = 'patch';
    } else if (argv.minor) {
        importance = 'minor';
    } else if (argv.major) {
        importance = 'major';
    } else {
        global.noImportance = true;
        gutil.log(gutil.colors.red.bold('[incVersion]: No importance argument. Version increment skipped'));
    }

    if (! importance) {
        return gutil.noop();
    }

    return gulp.src(['./package.json'])
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'));
});


