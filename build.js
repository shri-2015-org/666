/* eslint no-console: 0 */
import fs from 'fs';
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
      path.join(__dirname, 'common'),
    ],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
  plugins: [
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
      DATAPORT: '"3000"',
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
      start: 'PORT=8080 DATAPORT=3000 babel-node server/server.prod.js',
    },
    dependencies: orig.dependencies,
    author: orig.author,
  };
  console.log(pack);
  fs.writeFile('build/package.json', JSON.stringify(pack, null, 2), () => {
    console.log('package.json added');
  });
});
