import Vue from 'vue'
import VueRouter from 'vue-router'
//import store from '@/state/store'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // use "normal looking" routes instead of hashed (example.com/#/about)
  mode: 'history',
  // simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

// router.beforeEach((routeTo, routeFrom, next) => {
//   // check if auth is required on this route
//   // (including nested routes).
//   const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

//   // if auth isn't required for the route, just continue.
//   if (!authRequired) return next()

//   if (authRequired) {
//     const userAuthenticated = store.getters['users/getAuthenticated']

//     if (!userAuthenticated) {
//       window.location.href = '/bruker/logg-inn/'
//     } else {
//       next()
//     }
//   }
// })

export default router
