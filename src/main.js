import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/hot/main', 'pages/content/main', 'pages/nodes/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#efefef',
      navigationBarTitleText: 'V2EX',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    tabBar: {
      color: '#aaaaaa',
      selectedColor: '#000000',
      position: 'top',
      backgroundColor: '#ffffff',
      list: [{
        pagePath: 'pages/index/main',
        text: '最新'
      }, {
        pagePath: 'pages/hot/main',
        text: '最热'
      }, {
        pagePath: 'pages/nodes/main',
        text: '节点'
      }]
    }
  }
}
