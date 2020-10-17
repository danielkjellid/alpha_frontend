import Vue from 'vue'
import App from './app.vue'
import router from '@/router'
import VueAnalytics from 'vue-analytics'
import store from '@/state/store'
import axios from 'axios'

import '@/assets/css/tailwind.css'
import '@/components/_globals'

// global mixins
import permissionsMixin from '@/mixins/permissions'
import errorMixin from '@/mixins/errorMixin'
import errorMessageMixin from '@/mixins/errorMessageMixin'

Vue.mixin(permissionsMixin)
Vue.mixin(errorMixin)
Vue.mixin(errorMessageMixin)

// global directives
import DetectClickOutside from '@/utils/detect-click-outside'

Vue.directive('click-outside', DetectClickOutside)

// global filters
import formatPrice from '@/utils/format-price'

Vue.filter('formatPrice', formatPrice)

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(VueAnalytics, {
  id: 'UA-179947262-1',
  router
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
