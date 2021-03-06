var path = require('path');
var webpack = require('webpack');
//const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: '#eval-source-map',
    entry: {
        main: [
            'webpack-dev-server/client?http://0.0.0.0:3090',
            'webpack/hot/only-dev-server',
            './src/main.js'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'server/public'),
        // publicPath: 'server/public/'
        publicPath: 'public/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/, 
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'shared')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    devServer: {
      historyApiFallback: true
    }
};