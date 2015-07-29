var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/client/main.jsx'
  ],
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['babel?stage=0&optional[]=runtime'],
      include: path.join(__dirname, '../src/client')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
