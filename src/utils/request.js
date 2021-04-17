import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
// request interceptor
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // 请根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// 响应拦拦截器
// response interceptor
service.interceptors.response.use(
 
  /**
   * 通过自定义代码确定请求状态
   * 举个栗子
   * 您还可以通过HTTP状态代码来判断状态
   */
  response => {
    const res = response.data

    // 如果定制代码不是20000，则判定为错误。
    
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法令牌;50012:其他客户端已登录;50014:令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service