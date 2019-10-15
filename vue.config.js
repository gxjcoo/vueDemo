module.exports = {
    devServer: {
            proxy: {
            '/api': {
              target: 'http://10.121.201.237:8080',
              changeOrigin: true,
              // 路径重写： 下面的意思是重写访问路径中的  '/api' 为 '' ，如果没有重写, /api 代表 http://127.0.0.1:8090/api
              pathRewrite: {
                '^/api': ''
              }
          }
        }
      }
  }
