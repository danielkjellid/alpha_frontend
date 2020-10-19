import Home from '@/views/home.vue'
import Category from '@/views/category.vue'
import Product from '@/views/product.vue'
import LogIn from '@/views/auth-log-in.vue'
import Register from '@/views/auth-register.vue'
import ResetPassword from '@/views/auth-reset-password.vue'
import ResetPasswordConfirm from '@/views/auth-reset-password-confirm.vue'
import ResetPasswordSetPassword from '@/views/auth-reset-password-set-password.vue'

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
    path: '/konto/nullstill-passord/',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/konto/nullstill-passord/sendt/',
    name: 'ResetPasswordConfirm',
    component: ResetPasswordConfirm
  },
  {
    path: '/konto/nullstill-passord/:uid/:token/sett-passord/',
    name: 'ResetPasswordSetPassword',
    component: ResetPasswordSetPassword
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