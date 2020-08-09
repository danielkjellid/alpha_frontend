import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/state/store'

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

router.beforeEach(async (routeTo, routeFrom, next) => {
  // check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)
  const currentUser = store.state.users.currentUser

  if (!authRequired) return next()

  // if the authRequired flag is true in route meta
  if (authRequired) {
    // if the currentUser state is not null
    if (currentUser && currentUser.is_authenticated) {
      next()
    } else {
      // run the fetchCurrentUser action in store
      // this is in case of the route being accessed before the init action is run, and the currentUser state is null
      await store.dispatch('users/fetchCurrentUser').then(() => {
        // when the action is run, get the object trough the getCurrentUser getter
        const user = store.getters['users/getCurrentUser']

        // if the user is fetched from the api, and still not authenticated, redirect to login
        if (!user.is_authenticated) {
          window.location.href = '/bruker/logg-inn/'
        } else {
          next()
        }
      })
    }
  }
})

export default router


