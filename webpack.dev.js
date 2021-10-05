/* eslint-disable-next-line import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
/* eslint-disable-next-line import/no-extraneous-dependencies */
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
});
