import path from 'path';
import webpack from 'webpack';

// import { transform } from 'babel-core';
// transform('code', {
//   plugins: ['node-env-inline'],
// });

const FILEHOST = 'localhost';
const FILEPORT = 8080;

// --- BASE CONFIG

const base  = {
  entry: [
    './client/main',
  ],
  output: {
    path: path.join(__dirname, 'build/client'),
    filename: 'bundle.js',
    publicPath: '/',
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
  ],
};

// --- EXTEND FOR DEVELOPMENT

const dev = Object.assign(base, {
  debug: true,
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://' + FILEHOST + ':' + FILEPORT,
    'webpack/hot/only-dev-server',
    ...base.entry,
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'client'),
      }, {
        test: /\.scss$/,
        loader: 'style!' +
                'css?sourceMap!' +
                'autoprefixer?{browsers: ["last 2 version", "IE 9"]}!' +
                'sass?sourceMap&outputStyle=compressed',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...base.plugins,
  ],
});

// --- EXTEND FOR PRODUCTION

export default Object.assign(base, {
  debug: false,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client'),
      }, {
        test: /\.scss$/,
        loader: 'style!' +
                'css?!' +
                'autoprefixer?{browsers: ["last 2 version", "IE 9"]}!' +
                'sass?outputStyle=compressed',
      },
    ],
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
      HOST: process.env.HOST,
    }),
    ...base.plugins,
  ],
  // hack export dev without split files
  devCfg: dev,
});

