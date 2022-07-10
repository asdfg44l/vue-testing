import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import term from './plugins/term'

Vue.use(VueAxios, axios)
Vue.use(term, {
  append: {
    north: ' hello north'
  }
})


import '@/assets/scss/all.scss'
import 'bootstrap/dist/js/bootstrap.esm'

Vue.prototype.$theme = 'default'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
