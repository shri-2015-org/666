import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  context: __dirname,
  entry: [
    './client/main.js',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'client'),
    }, {
      test: /\.scss$/,
      loader: 'style!' +
        'css?sourceMap!' +
        'autoprefixer?{browsers: ["last 2 version", "IE 9"]}!' +
        'sass?sourceMap&outputStyle=compressed',
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
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('client/css/bundle.css'),
  ],
};
