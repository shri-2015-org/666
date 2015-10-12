import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const root = __dirname.slice(0, -7);
console.log('Root folder is', root);

export default {
  debug: false,
  cache: false,
  entry: [
    './client/main',
  ],
  output: {
    path: path.join(root, 'build/static'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(root, 'client'),
        path.join(root, 'common'),
      ],
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        'css-loader!autoprefixer-loader?{browsers: ["last 2 version", "IE 9"]}!' +
        'sass-loader?outputStyle=compressed'),
      include: [
        path.join(root, 'client'),
      ],
    }],
  },
  resolve: {
    alias: {
      'actions': path.join(root, 'client/actions.js'),
    },
    modulesDirectories: [
      'node_modules',
      path.join(root, 'client'),
      path.join(root, 'common'),
    ],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      filename: 'index.html',
      template: root + '/client/index.html',
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
    }),
  ],
};

