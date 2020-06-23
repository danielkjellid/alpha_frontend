import Vue from 'vue'
import App from './App.vue'
import router from '@/router/routes'
import store from '@/state/store'

import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
