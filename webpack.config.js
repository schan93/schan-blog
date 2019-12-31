const path = require('path');
const { resolve } = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const { DefinePlugin } = require ('webpack');

module.exports = {
  entry: [
    // entry point for your bundle. if index.js imports other JS files, bundle them as well
    path.join(__dirname, './src/index.js')
  ],
  // bundled code should reside in dist folder
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        // which files should babel be used on
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
      { 
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['url-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([
      { from: 'src/assets/images', to: 'assets/images' }
    ]),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ],
    // dist used to serve our application in browser
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
}