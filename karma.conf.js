module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'src/spec/**/*.spec.*'
    ],
    webpack: {
      module: {
        loaders: [{
          test: /\.jsx$|\.js$/,
          loaders: ['babel']
        }]
      }
    },
    preprocessors: {
      'src/spec/**/*.spec.js': ['webpack']
    },
    plugins: [
      require('karma-webpack'),
      require('karma-mocha')
    ]
  });
};
