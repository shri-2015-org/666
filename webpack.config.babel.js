import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const FILEHOST = 'localhost';
const FILEPORT = 8080;

export default {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + FILEHOST + ':' + FILEPORT,
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
    },
    modulesDirectories: [
      'node_modules',
      path.join(__dirname, 'client'),
      path.join(__dirname, 'common'),
    ],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: __dirname + '/client/index.html',
    }),
    new webpack.DefinePlugin({
      NODE_ENV: '"development"',
      DATAPORT: '"3001"',
    }),
  ],
};

