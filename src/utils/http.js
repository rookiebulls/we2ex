import Fly from 'flyio/dist/npm/wx'
import wx from './wx'

const http = new Fly()

http.config.baseURL = 'https://www.v2ex.com/api/'

http.interceptors.request.use(request => {
  wx.showNavigationBarLoading()
  return request
})

http.interceptors.response.use((response, promise) => {
  wx.hideNavigationBarLoading()
  return promise.resolve(response.data)
}, (error, promise) => {
  wx.hideNavigationBarLoading()
  return promise.reject(error)
})

export default http
