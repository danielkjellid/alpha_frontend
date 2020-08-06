import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home'
// import UsersOverview from '@/views/users-overview'
import UserDetail from '@/views/user-detail'
import UserEdit from '@/views/user-edit'

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
    component: () => import('@/views/users-overview.vue'),
  },
  {
    path: '/backend/users/:id',
    name: 'UserDetail',
    component: UserDetail
  },
  {
    path: '/backend/users/:id/edit',
    name: 'UserEdit',
    component: UserEdit
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
