const { defineConfig } = require('@vue/cli-service')

'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true, //是否跨域
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },

    // },
    proxy: {
      '/api': { // 请求的代称，写在Axios里的BaseUrl
        target: 'http://yoursigh.top', // 真实请求URl
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: { 
          '^/api': '' 
        }
      }
    },
    // host: 'localhost', //
    // port: 8080, //
  },


})
