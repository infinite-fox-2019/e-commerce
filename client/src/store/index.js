import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const server = 'http://localhost:3000'
let token = localStorage.getItem('token')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    cart: [],
    transactions: [],
    user: { role: '' },
    isLogin: false
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
    },
    UPDATE_TRANSACTION (state, transactions) {
      state.transactions = transactions
    },
    UPDATE_LOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: `${server}/users/login`,
        data: { email: payload.email, password: payload.password }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          context.commit('UPDATE_LOGIN', true)
        })
        .catch(console.log)
    },
    register (context, payload) {
      axios({
        url: `${server}/users/register`,
        method: 'POST',
        data: { name: payload.name, email: payload.email, password: payload.password }
      })
        .then(({ data }) => {
          context.dispatch('login', { email: payload.email, password: payload.password })
        })
    },
    logout (context) {
      localStorage.removeItem('token')
      context.commit('UPDATE_LOGIN', false)
    },
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
    updateCart (context) {
      axios({
        method: 'PATCH',
        url: `${server}/users/cart`,
        data: { cart: this.state.cart },
        headers: { token }
      })
        .then(({ data }) => {
          console.log(data, 'abis update (user)')
          context.dispatch('getCart')
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    getCart (context) {
      axios({
        method: 'GET',
        url: `${server}/users/cart`,
        headers: { token }
      })
        .then(({ data }) => {
          context.commit('GET_CART', data.cart)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    deleteFromCart (context, payload) {
      axios({
        method: 'DELETE',
        url: `${server}/users/cart/${payload.id}`,
        headers: { token }
      })
        .then(() => {
          context.dispatch('getCart')
        })
        .catch(console.log)
    },
    checkout (context, payload) {
      axios({
        url: `${server}/transactions`,
        method: 'POST',
        headers: { token },
        data: { price: payload.price, items: this.state.cart }
      })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('getCart')
        })
        .catch(console.log)
    },
    getTransaction (context) {
      axios({
        url: `${server}/transactions`,
        method: 'GET',
        headers: { token }
      })
        .then(({ data }) => {
          context.commit('UPDATE_TRANSACTION', data)
        })
        .catch(console.log)
    },
    updateTransaction (context, payload) {
      axios({
        url: `${server}/transactions/${payload.id}`,
        method: 'PATCH',
        headers: { token },
        data: { status: payload.status }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(console.log)
    }
  }
})
