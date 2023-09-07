const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭严格语法检查
  devServer: {
    proxy: {
      '/api': { // 请求的代称，写在Axios里的BaseUrl
        target: 'http://127.0.0.1:8081/', // 真实请求URl
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: {'^/api': ''}
      }
    }
  }
})
