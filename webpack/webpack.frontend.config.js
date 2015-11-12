var path = require('path');

module.exports = {
  entry: './src/client/main.jsx',
  target: 'web',
  output: {
    path: path.join(__dirname, '../dist/client'),
    filename: 'client.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, '../src/client')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
