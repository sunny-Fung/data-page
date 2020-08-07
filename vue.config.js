module.exports = {
  // http-proxy-middleware是一个npm模块，是proxy的底层原理实现
  devServer: {
    port: 8080,
    host: '192.168.1.159',
    proxy: {
      // '/'这个key在http-proxy-middleware中被称为context
      // 用来决定哪些请求需要被target对应的主机地址代理
      // 它可以是字符串，含有通配符的字符串，或是一个数组
      // 分别对应于path matching(路径匹配)wildcard path matching(通配符路径匹配)multiple path matching(多路径匹配)
      // 简言之，这个key就是匹配path的，一旦匹配到符合的path，就会把请求转发的代理主机去，而代理主机的地址就是target字段对应的内容
      '/': {
        target: 'https://api.bilibili.com',
        // 允许跨域
        changeOrigin: true,
        ws: true
      }
    }
  },
  lintOnSave: false
};
