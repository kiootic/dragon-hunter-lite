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
          emitErrors: true, failOnHint: true
        }
      }, {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'src/worker'),
        options: { instance: 'app' }
      }, {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src/worker'),
        options: { instance: 'worker' }
      }, {
        exclude: /\.json/,
        include: [path.resolve(__dirname, 'assets')],
        use: {
          loader: 'file-loader',
          options: { name: 'assets/[hash].[ext]' }
        }
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    chunkFilename: 'app.[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    require('./tools/spritesheet'),
  ]
};