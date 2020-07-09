import Vue from 'vue'
import App from './app.vue'
import router from '@/router/routes'
import store from '@/state/store'
import axios from 'axios'

import '@/assets/css/tailwind.css'
import '@/components/_globals'

axios.defaults.xsrfHeaderName = "X-CSRFToken"; 
axios.defaults.xsrfCookieName = "csrftoken";

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
