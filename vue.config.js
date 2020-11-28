VUE_APP_API_URL = "http://localhost/currencyTask/public/api/"
module.exports = {
    chainWebpack: config => {
      config.plugin('html').tap(args => {
        args[0].title = 'Currency-vue'
        return args
      })
    }
  }