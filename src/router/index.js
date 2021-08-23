import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const hero = () => import('../views/hero')
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/hero',
  name: 'hero',
  component: hero
}]

const router = new VueRouter({
  routes
})
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


export default router
