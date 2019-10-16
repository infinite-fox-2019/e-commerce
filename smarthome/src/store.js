import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        username: null,
        email: null,
        role: null,
        products: []
    },
    mutations: {
        setToken(state) {
            state.token = localStorage.getItem('token')
        },
        setUserMeta(state, payload) {
            state.username = payload.username
            state.email = payload.email
            state.role = payload.role
        },
        setProducts(state, payload) {
            state.products = payload
        }
    },
    actions: {
        register({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/users/register', payload)
                    .then(({ data }) => {
                        localStorage.setItem('token', data.token)
                        commit('setToken')
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
                        commit('setToken')
                        commit('setUserMeta', data)
                        resolve()
                    }).catch(reject);
            })
        },
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
