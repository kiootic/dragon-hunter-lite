const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [{
  entry: {
    app: './src/app',
    vendor: [
      'pixi.js',
      'stats.js',
      '@tweenjs/tween.js',
      'rxjs',
      'lodash',
    ]
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { configFile: 'tslint.json', emitErrors: true, failOnHint: true }
      }, {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }, {
        include: [
          path.resolve(__dirname, 'assets')
        ],
        use: {
          loader: 'file-loader',
          options: { name: 'assets/[hash].[ext]' }
        }
      }, {
        test: /index\.html$/,
        use: {
          loader: 'file-loader',
          options: { name: '[path][name].[ext]' }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'app': path.resolve(__dirname, 'src', 'app'),
      'common': path.resolve(__dirname, 'src', 'common'),
      'data': path.resolve(__dirname, 'src', 'data'),
      'assets': path.resolve(__dirname, 'assets'),
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    require('./tools/spritesheet')
  ]
}, {
  target: "webworker",
  entry: {
    worker: './src/worker'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { configFile: 'tslint.json', emitErrors: true, failOnHint: true }
      }, {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'worker': path.resolve(__dirname, 'src', 'worker'),
      'common': path.resolve(__dirname, 'src', 'common'),
      'data': path.resolve(__dirname, 'src', 'data'),
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}];