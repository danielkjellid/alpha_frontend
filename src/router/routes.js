import Home from '@/views/home.vue'

export default [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/_404.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/backend/users',
    name: 'UsersOverview',
    component: () => import('@/views/users-overview.vue'),
    meta: { authRequired: true, staffRequired: true }
  },
  {
    path: '/backend/users/:id',
    name: 'UserDetail',
    component: () => import('@/views/user-detail.vue'),
  },
  {
    path: '/backend/users/:id/edit',
    name: 'UserEdit',
    component: () => import('@/views/user-edit.vue'),
  },
]