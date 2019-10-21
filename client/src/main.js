import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    next ({ response: { status, data } }) {
      let message = data
      if (Array.isArray(data)) {
        message = data.join('<br/>')
      }
      this.$swal({
        type: 'error',
        title: `Error: ${status}`,
        html: message,
        footer: '<a href>Why do I have this issue?</a>'
      })
    }
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
