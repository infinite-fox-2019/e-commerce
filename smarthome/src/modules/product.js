import axios from '../config/axios'

export default {
    namespaced: true,
    state: {
        products: []
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload
        },
    },
    actions: {
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
}