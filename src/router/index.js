import Vue from 'vue'
import VueRouter from 'vue-router' // https://github.com/declandewet/vue-meta
import VueMeta from 'vue-meta'
import routes from './routes'
import store from '@/state/store'

Vue.use(VueRouter)
Vue.use(VueMeta, {
  keyName: 'page'
})

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
  const staffRequired = routeTo.matched.some((route) => route.meta.staffRequired)
  
  const currentUser = store.state.users.currentUser

  // if auth isn't required for the route, just continue
  if (!authRequired) return next()

  // if the user has to be authenticated
  if (authRequired) {
    // check is user is not null and that the user is authenticated
    if (currentUser && currentUser.is_authenticated) {
      // if everything passes, just continue
      next()
    } else {
        // if the user is null or the user isn't authenticated
        // run the fetchCurrentUser action in store
        // this is in case of the route being accessed before the init action is run, and the currentUser state is null
        await store.dispatch('users/fetchCurrentUser')
          .then(() => {
            // when the action is run, get the object through the getCurrentUser getter
            const user = store.getters['users/getCurrentUser']

            // if the user is fetched from the api, and still not authenticated, redirect to login
            if (!user.is_authenticated) {
              window.location.href = '/bruker/logg-inn/'
            } else {
              // if the user is authenticated, just continue
              next()
            }
          })
    }
  }

  // if the user has to be staff
  if (staffRequired) {
    // check is user is not null and that the user is authenticated
    if (currentUser && currentUser.is_authenticated) {
      // check if the user is staff
      if (currentUser.is_staff) {
        // if everything passes, just continue
        next()
      } else {
        // if the user is authenticated, but not staff
        // redirect to 404 - Not found
        next({ path: '/404' })
      }
    } else {
      // if the user is null or the user isn't authenticated
      // run the fetchCurrentUser action in store
      // this is in case of the route being accessed before the init action is run, and the currentUser state is null
      await store.dispatch('users/fetchCurrentUser')
        .then(() => {
          // when the action is run, get the object through the getCurrentUser getter
          const user = store.getters['users/getCurrentUser']

          // if the user is fetched from the api, and still not authenticated, redirect to login
          if (!user.is_authenticated) {
            window.location.href = '/bruker/logg-inn/'
          // if the user is fetched and authenticated, but not staff, redirect to 404
          } else if (!user.is_staff) {
            next({ path: '/404' })
          } else {
            // if everything passes, just continue
            next()
          }
        })
    }
  }
})

export default router


