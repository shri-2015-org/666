const webpack = require('webpack');
const path = require('path');
const bower_dir = path.join(__dirname, 'client', 'vendor');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Define Plugin is added in Dev mode
// through gulp config

// Define Plugin usage:
//
// if (NODE_ENV === 'production') {
//     console.log('There is Production mode');
// } else {
//     console.log('There is Development mode');
// }

var bowerPlugins = new webpack.ResolverPlugin(
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
);

var commonsPlugin =
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js');

module.exports = {
    debug: true,
    context: __dirname, // This option allows to write relative paths in the "entry" prop. Note: Doesn't affect "output"
    entry: {
        bundle: [
            './client/js/main.js'
        ],
        vendor: [
            './client/js/vendor.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: 'http://localhost:8080/',
        filename: 'js/[name].js', // Template [name] based naming to make in expandable with future multiple entrypoints option
        chunkFilename: 'js/[id].[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|vendor/,
                loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime']
            },
            {
                test: /\.scss$/,
                exclude: /vendor/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!autoprefixer-loader?{browsers: ["last 2 version", "IE 9"]}!sass-loader?outputStyle=compressed',
                    {
                        publicPath: '/'
                    }
                )
            },
            {
                test: /\.(svg|png|jpg)$/,
                loader: 'url-loader?limit=16000' // inline base64 assets less than 15kb
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                loader: 'url-loader?limit=16000&name=fonts/[name].[ext]' // inline base64 assets less than 15kb
            },
        ]
    },
    resolve: {
        alias: {
            'utils': path.join(__dirname, 'client/js/utils/'),
            'views': path.join(__dirname, 'client/js/views/'),
            'mixins': path.join(__dirname, 'client/js/mixins/')
        },
        modulesDirectories: [
            'node_modules',
            bower_dir,
            path.join(__dirname, 'client')
        ],
        extensions: ['', '.js', '.jsx', '.json', '.scss', '.css']
    },
    plugins: [
        bowerPlugins,
        commonsPlugin,
        new ExtractTextPlugin("css/bundle.css", {
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        }),
        new webpack.ProvidePlugin({
            '_': "lodash"
        })
    ]
}
