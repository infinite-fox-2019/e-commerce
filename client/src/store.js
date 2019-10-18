import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const server = 'http://localhost:3000'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTVhNDE1YTUwY2FjNjJlY2RjYzhhOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTcxMzM2Nzc0fQ.QhjJkHcet1KJZHOrkGplxcwD1-sD3k9PKlvztlkFzEs'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        products: [],
        product: {},
        cart: [],
        transactions: [],
        user: {role: ''}
    },
    mutations: {
        GET_PRODUCTS(state, products){
            state.products = products
        },
        GET_PRODUCT_DETAIL(state, product){
            state.product = product
        }
    },
    actions: {
        fetchProducts(context){
            axios({
                method: 'GET',
                url: `${server}/products`,
                headers: { token }
            })
            .then(({ data })=>{
                context.commit('GET_PRODUCTS', data)
            })
            .catch(console.log)
        },
        getProduct(context, payload){
            axios({
                method: 'GET',
                url: `${server}/products/${payload.id}`,
                headers: { token }
            })
            .then(({ data })=>{
                context.commit('GET_PRODUCT_DETAIL', data)
            })
            .catch(console.log)
        },
       createTransaction(context, payload){
           axios({
               method: 'POST',
               url: `${server}/transactions`,
               data: payload,
               headers: { token }
           })
       }
    }
})

export default store
