import path from 'path';
import webpack from 'webpack';

const FILEHOST = process.env.FILEHOST || 'localhost';
const FILEPORT = process.env.FILEPORT || 8080;

export default {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + FILEHOST + ':' + FILEPORT,
    'webpack/hot/only-dev-server',
    './client/main',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
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
  ],
};
