import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/axios' // axios请求
import comFunction from './static/js/comFunction.js' // 公共函数
import element from './element-ui/index'
import 'echarts/map/js/china.js'


Vue.config.productionTip = false
Vue.use(element)
Vue.use(axios)
Vue.use(comFunction)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
