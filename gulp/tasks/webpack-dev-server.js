var chalk = require('chalk');
var path = require('path');

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpConfig = require('../config').webpack;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfigPath = path.join(process.cwd(), 'webpack.config.js');
var webpackConfig = require(webpackConfigPath);

gulp.task('webpack-dev-server', function() {

    var config = Object.create(webpackConfig);

    config['devtool'] = 'eval';
    config['cache'] = true;

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('development')
        })
    );

    config.entry.bundle.push(
        'webpack-dev-server/client?http://' + gulpConfig.ip + ':' + gulpConfig.port + '/',
        'webpack/hot/dev-server'
    )

    var compiler = webpack(config);

    new WebpackDevServer(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'build/',
        hot: true,
        inline: true,
        //noInfo: true,
        // quiet: true,
        stats: { colors: true }

    }).listen(gulpConfig.port, gulpConfig.ip, function(err, result) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err)
        }

        gutil.log(chalk.green('Server is running at ' + gulpConfig.ip + ':' + gulpConfig.port));
    });
});






