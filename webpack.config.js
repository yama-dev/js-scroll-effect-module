const pkg = require('./package.json');

const comment = `JS SCROLL EFFECT MODULE (JavaScript Library)
  ${pkg.name}
Version ${pkg.version}
Repository ${pkg.repository.url}
Copyright ${pkg.author}
Licensed ${pkg.license}`;

const env = process.env.NODE_ENV;

const webpack = require('webpack');

const webpackPlugEnv = new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  DEBUG: false,
  VERSION: pkg.version
});

const webpackPlugBnr = new webpack.BannerPlugin({
  banner: comment,
});

const babelPlugin = [
  '@babel/plugin-transform-object-assign'
];

const config = {
  mode: env || 'development',
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
        enforce: 'pre',
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false
                }
              ]
            ],
            plugins: babelPlugin
          }
        }
      }
    ]
  },
  plugins: [
    webpackPlugEnv,
    webpackPlugBnr
  ]
};

module.exports = config;
