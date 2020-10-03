import Vue from 'vue'
import App from './app.vue'
import router from '@/router'
import store from '@/state/store'
import axios from 'axios'

import '@/assets/css/tailwind.css'
import '@/components/_globals'
import permissionsMixin from '@/mixins/permissions'
import DetectClickOutside from '@/utils/detect-click-outside'
import formatPrice from '@/utils/format-price'

axios.defaults.xsrfHeaderName = "X-CSRFToken"; 
axios.defaults.xsrfCookieName = "csrftoken";

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.mixin(permissionsMixin)
Vue.directive('click-outside', DetectClickOutside)
Vue.filter('formatPrice', formatPrice)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
