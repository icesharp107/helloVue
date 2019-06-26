/*
https://www.zhangshengrong.com/p/AvN6ByQkNm/ 网搜看到

vue-cli3推崇零配置的话，导致了跟之前vue-cli2的配置方式都不一样了。
    cli3配置新的，要创建vue.config.js来配置，会掩盖之前配置

 不同之处：   
别名设置，sourcemap控制，输入文件位置和输出文件位置和输出的方式，
压缩js控制，打包webapck日志分析，externals忽略配置（外部引入），
调试的端口配置，proxy接口配置
*/

module.exports = {
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
    /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
    publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
    // 简单一点， publicPath: '/',    是部署的基本路径


    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist', //构建好的文件输出的地方
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "assets",  //放置静态文件


    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,

    /* 代码保存时进行eslint检测 */
    lintOnSave: true, //用eslint检查？



    /* webpack-dev-server 相关配置 */
    devServer: {
      /* 自动打开浏览器 */
      open: true,
      /* 设置为0.0.0.0则所有的地址均能访问 */
      host: '0.0.0.0',
      port: 8066,
      https: false,
      hotOnly: false,
      /* 使用代理 */
      proxy: {
        '/api': {
          /* 目标代理服务器地址 */
          target: 'http://47.100.47.3/',
          /* 允许跨域 */
          changeOrigin: true,
        },
      },
    },

    css:{ //css配置选项
        loaderOptions:{}, //预处理器 loader传递自定义选项，比如用什么

        extract:true,   //只用于生产，组件中css提取到单独css文件
        sourceMap:false, 
        modules:false //开启所有与css相关的 css Modles？
    },
    pluginOptions:{} //第三方插件
  }