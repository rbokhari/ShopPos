var path = require('path');
var webpack = require('webpack');
//const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: '#eval-source-map',
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:9081',
            'webpack/hot/only-dev-server',
            './src/main.js'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public'),
        publicPath: '/public/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/, 
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'shared')
                ],
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loader: 'style!css!sass'
            }
        ]
    },
    devServer: {
      historyApiFallback: true
    }
};