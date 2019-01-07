const webpack = require('webpack');

const config = {
  mode: 'production',
  entry: './src/js-scroll-effect-module.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'js-scroll-effect-module.js',
    library: 'SCROLL_EFFECT_MODULE',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {'modules': false}]
              ]
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  }
};

module.exports = config;
