import Vue from 'vue'
import App from './app.vue'
import router from '@/router/routes'
import store from '@/state/store'
import axios from 'axios'

import '@/assets/css/tailwind.css'
import '@/components/_globals'

Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.headers.common['Accept'] = 'application/json'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
