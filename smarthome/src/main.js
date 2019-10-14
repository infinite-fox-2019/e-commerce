import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueAWN from "vue-awesome-notifications"
import "vue-awesome-notifications/dist/styles/style.css"


Vue.use(VueAWN, {
    durations: {
        global: 2000
    }
})

Vue.config.productionTip = false

Vue.mixin({
    methods: {
        next: function ({ response: { data: { code, message } } }) {
            // next: function (obj) {
            const vm = this

            if (Array.isArray(message)) message = message.join('\n')
            vm.$awn.alert(message, { labels: { alert: `Error ${code}` } })
        },
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
