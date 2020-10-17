import Home from '@/views/home.vue'
import Category from '@/views/category.vue'
import Product from '@/views/product.vue'
import LogIn from '@/views/log-in.vue'
import Register from '@/views/register.vue'
import Auth from '@/views/templates/auth.vue'

export default [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/_404.vue'),
  },
  {
    path: '/konto/logg-inn/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/konto/registrer/',
    name: 'Register',
    component: Register
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
    path: '/kategori/:categorySlug/',
    name: 'Category',
    component: Category,
    meta: {
      navbarTransparent: true
    },
    props: route => ({ query: route.query.filter })
  },
  {
    path: '/kategori/:categorySlug/:productSlug/',
    name: 'Product',
    component: Product,
    meta: {
      navbarTransparent: true
    }
  },
  {
    path: '/test/',
    name: 'Test',
    component: Auth
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