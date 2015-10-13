import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const root = __dirname.slice(0, -7);
console.log('Root folder is', root);

export default {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    './client/main',
  ],
  output: {
    path: path.join(root, 'build/client'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot?sourceMap', 'babel?sourceMap'],
      include: [
        path.join(root, 'client'),
        path.join(root, 'common'),
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: root + '/client/index.html',
    }),
    new webpack.DefinePlugin({
      NODE_ENV: '"development"',
    }),
  ],
};

