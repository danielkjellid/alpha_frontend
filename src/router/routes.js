import Home from '@/views/home.vue'
import Category from '@/views/category.vue'
import Product from '@/views/product.vue'

export default [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/_404.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      navbarTransparent: true
    }
  },
  {
    path: '/:category',
    name: 'Category',
    component: Category,
    meta: {
      navbarTransparent: true
    }
  },
  {
    path: '/:category/:id',
    name: 'Product',
    component: Product,
    meta: {
      navbarTransparent: true
    }
  },

  // admin components
  {
    path: '/backend/inventory',
    name: 'InventoryOverview',
    component: () => import('@/views/admin/inventory-overview.vue'),
    meta: {
      authRequired: true,
      staffRequired: true
    }
  },
  {
    path: '/backend/users',
    name: 'UsersOverview',
    component: () => import('@/views/admin/users-overview.vue'),
    meta: { 
      authRequired: true, 
      staffRequired: true 
    }
  },
  {
    path: '/backend/users/:id',
    name: 'UserDetail',
    component: () => import('@/views/admin/user-detail.vue'),
    meta: { 
      authRequired: true, 
      staffRequired: true 
    }
  },
  {
    path: '/backend/users/:id/edit',
    name: 'UserEdit',
    component: () => import('@/views/admin/user-edit.vue'),
    meta: { 
      authRequired: true, 
      staffRequired: true 
    }
  },
]