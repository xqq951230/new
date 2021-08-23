const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: './', // 设置打包文件相对路径
  chainWebpack: (config) => {
    // 删除编译后的独立js文件上的预获取操作
    config.plugins.delete('prefetch');
    config.plugin('html').tap((args) => {
      args[0].title = '大数据服务管理平台';
      return args;
    })
    // 压缩图片
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  // 压缩js文件为 .gz格式  减少项目体积
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@i': path.resolve(__dirname, './src/static')
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ]
  },
  devServer: {
    overlay: {
      warning: true,
      error: true
    },
    open: true,
    host: '0.0.0.0',
    port: 8081,
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      // 为所有的服务器接口起一个别名前缀，为了和vue脚手架中其他页面的路由地址区分
      '/api': {
        target: 'http//:192.168.1.196', // 需要对接的服务器端口
        // secure: true, // 如果是https  需要配置这个参数
        changeOrigin: true, // 打开跨域
        pathRewrite: {
          '^/api': '' // 因为真实的服务器端的地址中不包含/api ，所以应该将程序中的、api删除（替换空字符串），再和target中的基础路径拼接起来作为发送到服务器端的最终请求地址
        }
      }
    }
  }
}
