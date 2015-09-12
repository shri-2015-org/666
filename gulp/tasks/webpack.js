var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');

var webpack = require('webpack');
var webpackConfigPath = path.join(process.cwd(), 'webpack.config.js');
var webpackConfig = require(webpackConfigPath);

gulp.task('webpack:build', ['lint'], function(callback) {

    var config = Object.create(webpackConfig);

    config.debug = false;

    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            sourceMap: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('production')
        })
    );

    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }

        gutil.log('[webpack:build]', stats.toString({colors: true}));
        callback();
    });
});
