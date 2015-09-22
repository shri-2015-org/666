import path from 'path';
import webpack from 'webpack';

const FILEHOST = process.env.FILEHOST || 'localhost';
const FILEPORT = process.env.FILEPORT || 8080;

// --- BASE CONFIG

const base  = {
  entry: [
    './client/main',
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
  ],
};

// --- EXTEND FOR DEVELOPMENT

export const dev = Object.assign(base, {
  debug: true,
  cache: true,
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://' + FILEHOST + ':' + FILEPORT,
    'webpack/hot/only-dev-server',
    './client/main',
  ],
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
  ],
});

// --- EXTEND FOR PRODUCTION

export const prod = Object.assign(base, {
  debug: false,
  plugins: [
    ...base.plugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      },
      sourceMap: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
  ],
});

