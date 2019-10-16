import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/axios'
import md5 from 'md5'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        username: null,
        email: null,
        role: null,
        gravatar: "https://www.gravatar.com/avatar/null",
        products: []
    },
    mutations: {
        setUserMeta(state, payload) {
            state.token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = state.token
            state.username = payload.username
            state.email = payload.email
            state.role = payload.role
            state.gravatar = "https://www.gravatar.com/avatar/" + md5(payload.email)
        },
        setProducts(state, payload) {
            state.products = payload
        },
        destroyCredentials(state) {
            localStorage.removeItem('token')
            state.token = null
            state.username = null
            state.email = null
            state.gravatar = "https://www.gravatar.com/avatar/null"
        }
    },
    actions: {
        // USER Route
        register({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/users/register', payload)
                    .then(({ data }) => {
                        localStorage.setItem('token', data.token)
                        commit('setUserMeta', data)
                        resolve()
                    })
                    .catch(reject)
            })
        },
        login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/users/login', payload)
                    .then(({ data }) => {
                        localStorage.setItem('token', data.token)
                        commit('setUserMeta', data)
                        resolve()
                    }).catch(reject);
            })
        },
        verifyUser({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get("/users/verify")
                    .then(({ data }) => {
                        commit("setUserMeta", data);
                        resolve()
                    }).catch(reject)
            })
        },
        // Product Route
        getProducts({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/products')
                    .then(({ data }) => {
                        commit('setProducts', data)
                        resolve()
                    })
                    .catch(reject)
            })
        }
    }
})
