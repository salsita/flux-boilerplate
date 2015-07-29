var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'sourcemap',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/client/main.jsx'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['react-hot', 'babel?stage=0&optional[]=runtime'],
      include: path.join(__dirname, '../src/client')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
