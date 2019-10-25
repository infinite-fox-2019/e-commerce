import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
const server = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    cart: [],
    transactions: [],
    role: '',
    isLogin: false
  },
  mutations: {
    GET_PRODUCTS (state, products) {
      console.log(state.role, '<<', products)
      state.products = products
      console.log(state.role, 'terbaru')
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
    },
    UPDATE_ROLE (state, payload) {
      console.log(payload, typeof payload, 'masuk mutation')
      state.role = payload
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
          localStorage.setItem('role', data.role)
          context.commit('UPDATE_LOGIN', true)
          context.commit('UPDATE_ROLE', data.role)
          router.push('/products')
        })
        .catch(({ response }) => {
          console.log(response.data)
          router.push('/')
        })
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
      localStorage.removeItem('role')
      context.commit('UPDATE_LOGIN', false)
    },
    verifyToken (context) {
      return axios({
        method: 'GET',
        url: `${server}/users/verify`,
        headers: { token: localStorage.getItem('token') }
      })
    },
    fetchProducts (context) {
      axios({
        method: 'GET',
        url: `${server}/products`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log('dispatch prducts')
          context.commit('GET_PRODUCTS', data)
        })
        .catch(console.log)
    },
    getProduct (context, payload) {
      axios({
        method: 'GET',
        url: `${server}/products/${payload.id}`,
        headers: { token: localStorage.getItem('token') }
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
        headers: { token: localStorage.getItem('token') }
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
        headers: { token: localStorage.getItem('token') }
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
        headers: { token: localStorage.getItem('token') }
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
        headers: { token: localStorage.getItem('token') },
        data: { price: payload.price, items: this.state.cart }
      })
        .then(({ data }) => {
          context.dispatch('getCart')
        })
        .catch(console.log)
    },
    getTransaction (context) {
      axios({
        url: `${server}/transactions`,
        method: 'GET',
        headers: { token: localStorage.getItem('token'), role: localStorage.getItem('role') }
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
        headers: { token: localStorage.getItem('token') },
        data: { status: payload.status }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    }
  }
})
