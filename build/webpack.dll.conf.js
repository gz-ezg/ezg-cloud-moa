const path = require('path');
const webpack = require('webpack');
const CleanWebpaclPlugin = require('clean-webpack-plugin');
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');

module.exports = {
//   mode: 'development',
  mode: 'production',
  entry: {
    vue: [
      'vue-router',
      'vuex',
      'vue',
    ],
    vant: ['vant'],
  },
  output: {
    filename: '_dll_[name].js', // 产生的文件名
    path: path.resolve(__dirname, '../dll'),
    library: '_dll_[name]',
    // publicPath: 'http://cloud.roderickt1an.cn/'
  },
  plugins: [
    // name要等于library里的name
    new CleanWebpaclPlugin(['dll'], {
      root: path.resolve(__dirname, '../dll'),
    }),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, '../dll', '[name]-manifest.json'),
      context: __dirname,
    }),
    new FirendlyErrorePlugin(),
  ],
};
