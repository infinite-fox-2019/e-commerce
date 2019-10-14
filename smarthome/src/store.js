import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        username: null,
        email: null,
    },
    mutations: {
        setToken(state) {
            state.token = localStorage.getItem('token')
        },
        setUserMeta(state, payload) {
            state.username = payload.username
            state.email = payload.email
        }
    },
    actions: {

    }
})
