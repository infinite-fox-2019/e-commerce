import axios from '../config/axios'
export default {
    namespaced: true,
    state: {
        cart: [],
        checkout: []
    },
    mutations: {
        setCart(state, payload) {
            state.cart = payload
        }
    },
    actions: {
        getCart({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/cart')
                    .then(({ data: { cart } }) => {
                        commit('setCart', cart)
                        resolve()
                    })
                    .catch(reject)
            })
        },

        addProductToCart({ commit }, payload) {
            const { id, quantity } = payload
            return new Promise((resolve, reject) => {
                axios.post('/cart', { id, quantity })
                    .then(({ data: { cart } }) => {
                        commit('setCart', cart)
                        resolve()
                    })
                    .catch(reject)
            })
        },

        removeProductToCart({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.patch('/cart/' + id)
                    .then(({ data: { cart } }) => {
                        commit('setCart', cart)
                        resolve()
                    })
                    .catch(reject)
            })
        },

        emptyCart({ commit }) {
            return new Promise((resolve, reject) => {
                axios.delete('/cart')
                    .then(({ data: { message } }) => {
                        commit('setCart', [])
                        resolve(message)
                    })
                    .catch(reject)
            })
        }
    }
}