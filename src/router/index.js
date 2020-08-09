import Vue from 'vue'
import VueRouter from 'vue-router'
//import store from '@/state/store'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
