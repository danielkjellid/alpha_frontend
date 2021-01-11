import Home from '@/views/home.vue'

// auth views
import LogIn from '@/views/auth-log-in.vue'
import Register from '@/views/auth-register.vue'
import ResetPassword from '@/views/auth-reset-password.vue'
import ResetPasswordConfirm from '@/views/auth-reset-password-confirm.vue'
import ResetPasswordSetPassword from '@/views/auth-reset-password-set-password.vue'

// inventory views
import ProductList from '@/views/inventory-product-list.vue'
import ProductDetail from '@/views/inventory-product-detail.vue'
import KitchenList from '@/views/inventory-kitchen-list.vue'
import KitchenDetail from '@/views/inventory-kitchen-detail.vue'

export default [
  // generic paths
  {
    path: '*',
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

  // auth paths
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

  // inventory paths
  {
    path: '/kategori/:categorySlug/',
    name: 'ProductList',
    component: ProductList,
    meta: {
      navbarTransparent: true
    },
    props: route => ({ query: route.query.filter })
  },
  {
    path: '/kategori/:categorySlug/:productSlug/',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: {
      navbarTransparent: true
    }
  },
  {
    path: '/kjokken/',
    name: 'KitchenList',
    component: KitchenList,
    meta: {
      navbarTransparent: true
    }
  },
  {
    path: '/kjokken/:kitchenSlug/',
    name: 'KitchenDetail',
    component: KitchenDetail,
    meta: {
      navbarTransparent: true
    }
  },
  {
    path: '/test/',
    name: 'Test',
    component: () => import('@/views/admin/marketing-page-builder.vue'),
  },
  {
    path: '/overview/',
    name: 'Overview',
    component: () => import('@/views/admin/users-overview.vue'),
  },
  {
    path: '/detail/',
    name: 'Detail',
    component: () => import('@/views/admin/users-detail.vue'),
  }

  // admin components
  // {
  //   path: '/backend/inventory',
  //   name: 'InventoryOverview',
  //   component: () => import('@/views/admin/inventory-overview.vue'),
  //   meta: {
  //     authRequired: true,
  //     staffRequired: true
  //   }
  // },
  // {
  //   path: '/backend/users',
  //   name: 'UsersOverview',
  //   component: () => import('@/views/admin/users-overview.vue'),
  //   meta: { 
  //     authRequired: true, 
  //     staffRequired: true 
  //   }
  // },
  // {
  //   path: '/backend/users/:id',
  //   name: 'UserDetail',
  //   component: () => import('@/views/admin/user-detail.vue'),
  //   meta: { 
  //     authRequired: true, 
  //     staffRequired: true 
  //   }
  // },
  // {
  //   path: '/backend/users/:id/edit',
  //   name: 'UserEdit',
  //   component: () => import('@/views/admin/user-edit.vue'),
  //   meta: { 
  //     authRequired: true, 
  //     staffRequired: true 
  //   }
  // },
]