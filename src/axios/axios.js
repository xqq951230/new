import axios from 'axios'
import router from 'router'
import store from 'store'
import {
  Message,
  Loading
} from 'element-ui'
import Cookies from 'js-cookie'

axios.defaults.timeout = 5000; // 超过5s则请求超时
// axios.defaults.baseURL = '' // 设置统一跨域接口  会替换为''字符串与url进行拼接
// post请求头信息
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset-UTF-8';
let pending = [];
// 请求前拦截
axios.interceptors.request.use(
  config => {
    // 添加取消标记
    config.cancelToken = new axios.CancelToken(cancel => {
      pending.push({
        cancel
      })
    })
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)
// 响应前拦截
axios.interceptors.response.use(
  response => {
    if (response.data.code == 0) {
      if (pending.length > 0) {
        for (let index = 0; index < pending.length; index++) {
          pending[index].cancel()
        }
        Message({
          type: 'error',
          message: '请重新登录!',
          center: true
        })
        Cookies.remove('Admin-Token')
        store.clear()
        pending = []
        router.push({
          name: 'login'
        })
      }
    }
    if (response.data.code != 0 && response.data.code != 1 && response.data.code != undefined) {
      if (response.headers['content-type'].indexOf('vnd.ms-excel') != -1) {
        if (response.status == 200) {
          Message({
            type: 'success',
            message: '导出成功!',
            center: true
          })
        }
      } else {
        Message({
          type: 'error',
          message: response.data.codeMessage,
          center: true
        })
      }
    }
    return response
  },
  error => {
    if (error && error.response) {
      if (error.response.status == 504) {
        Message({
          type: 'error',
          message: '请求超时!',
          center: true
        })
      } else {
        Message({
          type: 'error',
          message: '请求异常!',
          center: true
        })
      }
    }
    return Promise.reject(error)
  }
)

// 二次封装axios
export default {
  install: function (Vue, options) {
    Vue.prototype.$ajax = function (option) {
      const config = {};
      const loadingInstance = [];
      let targetList = []
      switch (option.method) {
        case 'get':
        case 'delete':
          config.params = option.params || null
          break;
        case 'post':
          config.data = option.params
          break;
        case 'put':
          config[option.type] = option.params
          break;
        default:
          config.params = option.params || null
          break;
      }
      config.method = option.method
      config.url = option.url
      config.responseType = option.responseType
      if (option.targetName) {
        targetList = option.targetName.split(',')
        targetList.forEach(element => {
          loadingInstance.push(Loading.service({
            lock: true,
            text: '',
            target: document.querySelector(element),
            background: option.loadingColor || '#fff'
          }))
        });
      }
      axios(config).then((response) => {
        if (loadingInstance && loadingInstance.length > 0) {
          loadingInstance.forEach(element => {
            element.close()
          });
        }
        if (response.status == 200) {
          if (option.responseType == 'blob') {
            option.cb(response.data)
          } else {
            if (response.data.code == 1) {
              option.cb(response.data.data || 1)
            } else {
              option.cr(response.data)
            }
          }
        }
      }).catch(() => {
        if (loadingInstance && loadingInstance.length > 0) {
          loadingInstance.forEach(element => {
            element.close()
          });
        }
      })
    }
  }
}
