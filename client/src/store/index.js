import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const server = 'http://localhost:3000'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTVhNDE1YTUwY2FjNjJlY2RjYzhhOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTcxMzM2Nzc0fQ.QhjJkHcet1KJZHOrkGplxcwD1-sD3k9PKlvztlkFzEs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    cart: [],
    transactions: [],
    user: { role: '' }
  },
  mutations: {
    GET_PRODUCTS (state, products) {
      state.products = products
    },
    GET_PRODUCT_DETAIL (state, product) {
      state.product = product
    },
    ADD_TO_CART (state, item) {
      state.cart.push(item)
    },
    GET_CART (state, cart) {
      state.cart = cart
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        method: 'GET',
        url: `${server}/products`,
        headers: { token }
      })
        .then(({ data }) => {
          context.commit('GET_PRODUCTS', data)
        })
        .catch(console.log)
    },
    getProduct (context, payload) {
      axios({
        method: 'GET',
        url: `${server}/products/${payload.id}`,
        headers: { token }
      })
        .then(({ data }) => {
          context.commit('GET_PRODUCT_DETAIL', data)
        })
        .catch(console.log)
    },
    createTransaction (context, payload) {
      axios({
        method: 'POST',
        url: `${server}/transactions`,
        data: payload,
        headers: { token }
      })
        .then(({ data }) => {
        // console.log(data)
          alert(data)
        })
        .catch(console.log)
    },
    updateCart () {
      axios({
        method: 'PATCH',
        url: `${server}/users/cart`,
        data: this.state.cart,
        headers: { token }
      })
        .then(({ data }) => {
          alert(data)
        })
        .catch(alert)
    },
    getCart (context) {
      axios({
        method: 'GET',
        url: `${server}/users/cart`,
        headers: { token }
      })
        .then(({ data }) => {
          context.commit('GET_CART', data)
        })
        .catch(alert)
    }
  }
})
