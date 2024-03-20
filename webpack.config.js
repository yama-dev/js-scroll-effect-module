const pkg = require('./package.json');

const comment = `/*! @yama-dev/${pkg.name} Version ${pkg.version} Repository ${pkg.repository.url} Copyright ${pkg.author} Licensed ${pkg.license} */`;

const env = process.env.NODE_ENV;

if(!env) process.exit(1);

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const webpackPlugEnv = new webpack.EnvironmentPlugin({
  DEBUG: false,
  VERSION: pkg.version
});

const config = {
  mode: env || 'development',
  entry: {
    'js-scroll-effect-module': './src/js-scroll-effect-module.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
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
        exclude: /node_modules[///](?!(@yama-dev)\/).*/,
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
            ]
          }
        }
      }
    ]
  },
  target: ['web', 'es5'],
  plugins: [
    webpackPlugEnv,
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            preamble: comment,
            comments: false,
          },
          // mangle: {
          //   properties: {
          //     builtins: true,
          //   },
          //   keep_fnames: true,
          //   reserved: ['SCROLL_EFFECT_MODULE'],
          // },
          compress: {
            drop_console: true
          }
        },
      }),
    ],
  }
};

module.exports = config;
