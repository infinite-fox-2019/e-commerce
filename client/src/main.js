import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueAWN from "vue-awesome-notifications"
import "vue-awesome-notifications/dist/styles/style.css"
import next from './config/errorHandler'
import vueMoment from 'vue-moment'


Vue.use(VueAWN, {
    durations: {
        global: 2000
    }
})

Vue.use(vueMoment)

Vue.config.productionTip = false

Vue.mixin({
    methods: {
        next,
        $go: function ({ data }) {
            const vm = this
            vm.$awn.success(data)
        }
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
