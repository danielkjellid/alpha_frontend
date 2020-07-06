import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home'
import UsersOverview from '@/views/users-overview'
import UserDetail from '@/views/user-detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/backend/users',
    name: 'UsersOverview',
    component: UsersOverview,
  },
  {
    path: '/backend/users/1',
    name: 'UserDetail',
    component: UserDetail
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
