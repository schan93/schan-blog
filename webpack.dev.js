const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { resolve } = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        port: 8081,
        hot: true,
        // historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            },
            '/**': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    }
});