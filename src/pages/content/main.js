import Vue from 'vue'
import App from './content'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '帖子详情'
  }
}
