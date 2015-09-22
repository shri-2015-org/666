/* eslint no-console: 0 */
import path from 'path';
import webpack from 'webpack';

import { transform } from 'babel-core';
transform('code', {
  plugins: ['node-env-inline'],
});

webpack({
  debug: false,
  cache: false,
  entry: [
    './client/main',
  ],
  output: {
    path: path.join(__dirname, 'build/client'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client'),
    }, {
      test: /\.scss$/,
      loader: 'style!' +
              'css!' +
              'autoprefixer?{browsers: ["last 2 version", "IE 9"]}!' +
              'sass?outputStyle=compressed',
    }],
  },
  resolve: {
    alias: {
    },
    modulesDirectories: [
      'node_modules',
      path.join(__dirname, 'client'),
    ],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      },
      sourceMap: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV,
      SOKETHOST: process.env.SOKETHOST,
      SOCKETPORT: process.env.SOCKETPORT,
    }),
  ],
}, (err, res) => {
  if (err) return console.log(err);
  return console.log(res.toString());
});

