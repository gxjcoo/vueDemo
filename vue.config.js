const path = require('path');
module.exports = {
	//配置多页面
   pages:{
	index:{
		entry:'src/main.js',
		template:'public/index.html'
	},
	page:'src/multiPage/page2.js',
},
	// 基本路径
	baseUrl: './',
	// 输出文件目录
	outputDir: 'html',
	// eslint-loader 是否在保存的时候检查
	lintOnSave: true,
	// webpack配置
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	chainWebpack: () => {},
	configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			config.mode = 'production';
		} else {
			// 为开发环境修改配置...
			config.mode = 'development';
		}

		Object.assign(config, {
			// 开发生产共同配置
			resolve: {
				alias: {
                    'echarts/map/js/world.js': path.resolve('./src/utils/world.js'),
					'@': path.resolve(__dirname, './src'),
					'@c': path.resolve(__dirname, './src/components'),
					'vue': 'vue/dist/vue.esm.js'
			
				}
			}
		});
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: true,

	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {},
		// 启用 CSS modules for all css / pre-processor files.
		modules: false
	},
	// use thread-loader for babel & TS in production build
	// enabled by default if the machine has more than 1 cores
	parallel: require('os').cpus().length > 1,
	// PWA 插件相关配置
	// see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	pwa: {},
	// webpack-dev-server 相关配置
	devServer: {
		open: process.platform === 'darwin',
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hotOnly: false,
      proxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true,
        // 路径重写： 下面的意思是重写访问路径中的  '/api' 为 '' ，如果没有重写, /api 代表 http://127.0.0.1:8080/api
        pathRewrite: {
          '^/api': ''
        }
    }
  },
		before: (app) => {}
	},
	// 第三方插件配置
	pluginOptions: {
		// ...
	}
};
