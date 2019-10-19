import axios from '../config/axiosFormData'

export default {
    namespaced: true,
    state: {
        products: []
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload
        },
        addProducts(state, payload) {
            state.products.unshift(payload)
        }
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
        },
        addProduct({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/products', payload)
                    .then(({ data }) => {
                        commit('addProducts', data)
                        resolve()
                    })
                    .catch(reject)
            })
        },
        editProduct({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.put('/products/' + payload.id, payload.data)
                    .then(() => this.dispatch('product/getProducts'))
                    .then(() => resolve())
                    .catch(reject)
            })
        },
        deleteProduct({ commit }, payload) {
            console.log('============ Masuk ============');
            return new Promise((resolve, reject) => {
                axios.delete('/products/' + payload)
                    .then(() => this.dispatch('product/getProducts'))
                    .then(({ data }) => resolve(data))
                    .catch(reject)
            })
        }
    }
}