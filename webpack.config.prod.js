const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./webpack.config');
module.exports = Object.assign(config, {
  mode: 'production',
  plugins: config.plugins.concat([
    new UglifyJsPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(['dist'])
  ])
});