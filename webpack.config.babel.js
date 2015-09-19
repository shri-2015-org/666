import path from 'path';
// import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';

// const environment = process.env.NODE_ENV || 'development';

export default {
  debug: true,
  devtool: 'eval',
  entry: [
//    'webpack-dev-server/client?http://localhost:3000',
//    'webpack/hot/only-dev-server',
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
//    }, {
//      test: /\.(eot|woff|ttf|svg|png|jpg)$/,
//      loader: 'url-loader?limit=0&name=[name].[ext]',
    }],
  },
  resolve: {
    alias: {
    },
    modulesDirectories: [
      'node_modules',
      path.join(__dirname, 'client'),
//      path.join(__dirname, 'static'),
    ],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
//  plugins: [
//    new webpack.DefinePlugin({'process.env.NODE_ENV': '"' + environment + '"'}),
//    new HtmlWebpackPlugin({
//      inject: 'body',
//      filename: 'index.html',
//      template: __dirname + '/static/index.html',
//    }),
//    new webpack.HotModuleReplacementPlugin(),
//  ],
};
