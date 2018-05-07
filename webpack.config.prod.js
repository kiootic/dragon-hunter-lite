const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./webpack.config');
module.exports = Object.assign(config, {
  mode: 'production',
  devtool: 'source-map',
  optimization: Object.assign(config.optimization, { minimizer: [new UglifyJsPlugin({ parallel: 8, sourceMap: true })] }),
  plugins: config.plugins.concat([
    new CleanWebpackPlugin(['dist'])
  ])
});