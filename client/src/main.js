import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'
import store from '../store/index'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.use(AWN, {
  durations: {
    global: 2000
  }
})

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
