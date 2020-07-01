import Vue from 'vue'
import App from './app.vue'
import router from '@/router/routes'
import store from '@/state/store'

import Fragment from 'vue-fragment'
import '@/assets/css/tailwind.css'

import '@/components/_globals'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Fragment,
  render: h => h(App)
}).$mount('#app')
