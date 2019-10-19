import axios from '../config/axios'
export default {
    namespaced: true,
    state: {
        cart: []
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
                    .then(({ data }) => {
                        commit('setCart', data)
                        resolve()
                    })
                    .catch(reject)
            })
        },

        addProductToCart({ commit }, payload) {
            const { id, quantity } = payload
            return new Promise((resolve, reject) => {
                axios.post('/cart', { id, quantity })
                    .then(({ data }) => {
                        commit('setCart', data)
                        resolve()
                    })
                    .catch(reject)
            })
        },

        removeProductToCart({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.patch('/cart/' + id)
                    .then(({ data }) => {
                        commit('setCart', data)
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
                    .cart(reject)
            })
        }
    }
}