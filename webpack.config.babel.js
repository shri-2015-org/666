import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from './config';

export default {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
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
      loaders: ['react-hot?sourceMap', 'babel?sourceMap'],
      include: [
        path.join(__dirname, 'client'),
        path.join(__dirname, 'common'),
      ],
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: __dirname + '/client/index.html',
    }),
    new webpack.DefinePlugin({
      NODE_ENV: '"development"',
      DATAPORT: '"' + config.socketPort + '"',
    }),
  ],
};

