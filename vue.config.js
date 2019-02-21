const path = require('path');
const merge = require('webpack-merge');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        //  修改样式文件不生效，不知道为啥
        modifyVars: {
          red: '#CC3300',
          '@nav-bar-background-color': '#CC3300',
          '@nav-bar-title-font-size': '32px',
        },
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.220:9000',
        pathRewrite: {
          '^/api': '',
        },
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@assets', resolve('src/assets'))
      .set('@api', resolve('src/api'))
      .set('@components', resolve('src/components'))
      .set('@layouts', resolve('src/layouts'));
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => {
        options = merge(options, {
          transpileOnly: true,
          compilerOptions: {
            module: 'es2015',
          },
        });
        return options;
      });
  },
};
