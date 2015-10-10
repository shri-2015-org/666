/* eslint no-console: 0 */
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from './config';

webpack({
  debug: false,
  cache: false,
  entry: [
    './client/main',
  ],
  output: {
    path: path.join(__dirname, 'build/static'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'client'),
        path.join(__dirname, 'common'),
      ],
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        'css-loader!autoprefixer-loader?{browsers: ["last 2 version", "IE 9"]}!' +
        'sass-loader?outputStyle=compressed'),
      include: [
        path.join(__dirname, 'client'),
      ],
    }],
  },
  resolve: {
    alias: {
      'actions': path.join(__dirname, 'client/actions.js'),
    },
    modulesDirectories: [
      'node_modules',
      path.join(__dirname, 'client'),
      path.join(__dirname, 'common'),
    ],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      filename: 'index.html',
      template: __dirname + '/client/index.html',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
      sourceMap: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: '"production"',
      DATAPORT: '"' + config.socket.port + '"',
    }),
  ],
}, (err, res) => {
  if (err) return console.log(err);
  return console.log(res.toString());
});

fs.readFile('package.json', (err, data) => {
  if (err) throw err;
  const orig = JSON.parse(data);
  const pack = {
    name: orig.name,
    version: orig.version,
    description: orig.description,
    scripts: {
      start: 'babel-node server/server.prod.js',
    },
    dependencies: orig.dependencies,
    author: orig.author,
  };
  console.log(pack);
  fs.writeFile('build/package.json', JSON.stringify(pack, null, 2), () => {
    console.log('package.json added');
  });
});
