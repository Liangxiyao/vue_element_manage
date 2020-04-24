module.exports = {
  publicPath: '/manage',
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
      }
    }
  },
  // css: {
  //   /*为预处理器 loader 传递自定义选项*/
  //   loaderOptions: {
  //       sass: {
  //         prependData: `@import "~@/assets/css/style.scss";`
  //       }
  //   }
  // },
  devServer: {
    proxy: {   // 代理
      '/': {
        target: 'http://123.56.99.109:8080',  // 代理路径
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/' : ''
        }
      }
    }
  }  
}