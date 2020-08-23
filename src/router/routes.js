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
    path: '/2',
    name: 'Home2',
    component: () => import('@/views/home2.vue'),
    meta: {
      navbarDark: true,
    }
  },
  {
    path: '/backend/inventory',
    name: 'InventoryOverview',
    component: () => import('@/views/inventory-overview.vue'),
    meta: {
      authRequired: true,
      staffRequired: true
    }
  },
  {
    path: '/backend/users',
    name: 'UsersOverview',
    component: () => import('@/views/users-overview.vue'),
    meta: { 
      authRequired: true, 
      staffRequired: true 
    }
  },
  {
    path: '/backend/users/:id',
    name: 'UserDetail',
    component: () => import('@/views/user-detail.vue'),
    meta: { 
      authRequired: true, 
      staffRequired: true 
    }
  },
  {
    path: '/backend/users/:id/edit',
    name: 'UserEdit',
    component: () => import('@/views/user-edit.vue'),
    meta: { 
      authRequired: true, 
      staffRequired: true 
    }
  },
]