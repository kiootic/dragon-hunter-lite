const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app',
  mode: 'development',
  performance: { hints: false },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all',
        }
      }
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: 'tslint.json', typeCheck: true, tsConfigFile: 'src/base.json',
          fix: true, emitErrors: true, failOnHint: true
        }
      }, {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: /src\/(app|common|data)\/.*\.ts/,
        options: { instance: 'app', configFile: 'src/app/tsconfig.json' }
      }, {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: /src\/(worker|common|data)\/.*\.ts/,
        options: { instance: 'worker', configFile: 'src/worker/tsconfig.json' }
      }, {
        exclude: /\.json/,
        include: [path.resolve(__dirname, 'assets')],
        use: {
          loader: 'file-loader',
          options: { name: 'assets/[hash].[ext]' }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'app': path.resolve(__dirname, 'src', 'app'),
      'common': path.resolve(__dirname, 'src', 'common'),
      'worker': path.resolve(__dirname, 'src', 'worker'),
      'data': path.resolve(__dirname, 'src', 'data'),
      'assets': path.resolve(__dirname, 'assets'),
    }
  },
  output: {
    filename: 'app.[hash].js',
    chunkFilename: 'app.[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this'    // workaround of webpack#6642
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    require('./tools/spritesheet'),
  ]
};