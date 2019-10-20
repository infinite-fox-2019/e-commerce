import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { resolve } from 'url';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    admin: false,
    products: [],
    user: [],
    search: ''
  },
  mutations: {
    LOGIN_STATE (state, payload) {
      state.login = payload
    },
    ADMIN_STATE (state, payload) {
      state.admin = payload
    },
    SET_PRODUCT (state, payload) {
      state.products = payload
    },
    GET_USER (state, payload) {
      state.user = payload
    },
    LOGOUT (state, payload) {
      state.login = false
    },
    SEARCH (state, payload) {
      state.search = payload
    }
  },
  actions: {
    login_state (context, value) {
      context.commit('LOGIN_STATE', value)
    },
    logout_state (context) {
      context.commit('LOGOUT')
      context.commit('ADMIN_STATE', false)
    },
    loggingIn (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'post',
          // url: 'http://localhost:3000/users/login',
          url: 'http://35.186.155.204/users/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('admin', data.admin)
            localStorage.setItem('id', data.id)
            context.commit('ADMIN_STATE', data.admin)
            context.commit('LOGIN_STATE', true)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getProducts (context) {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'get',
          // url: 'http://localhost:3000/products'
          url: 'http://35.186.155.204/products'
        })
          .then((products) => {
            context.commit('SET_PRODUCT', products)
            resolve()
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    getStatus (context) {
      let token = localStorage.getItem('token')
      if (token) {
        context.commit('LOGIN_STATE', true)
      }
      let admin = localStorage.getItem('admin')
      if (admin === 'true') {
        context.commit('ADMIN_STATE', true)
      } else {
        context.commit('ADMIN_STATE', false)
      }
    },
    addCart (context, payload) {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem('token')
        let id = localStorage.getItem('id')
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/users/${id}/addcart`,
          url: `http://35.186.155.204/users/${id}/addcart`,
          data: {
            qty: payload.qty,
            productId: payload.productId
          },
          headers: {
            token
          }
        })
          .then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    getUser (context, payload) {
      return new Promise((resolve, reject) => {
        let id = localStorage.getItem('id')
        Axios({
          method: 'get',
          // url: `http://localhost:3000/users/${id}`
          url: `http://35.186.155.204/users/${id}`
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    removecart (context, productId) {
      return new Promise((resolve, reject) => {
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/users/${id}/updcart`,
          url: `http://35.186.155.204/users/${id}/updcart`,
          data: {
            productId: productId
          },
          headers: {
            token
          }
        })
          .then((updated) => {
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getSpecificProduct (context, payload) {
      return new Promise((resolve, reject) => {
        let id = payload
        Axios({
          method: 'get',
          // url: `http://localhost:3000/products/${id}`
          url: `http://35.186.155.204/products/${id}`
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    updateProduct (context, payload) {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem('token')
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/products/${payload.id}`,
          url: `http://35.186.155.204/products/${payload.id}`,
          data: {
            detail: payload.values.detail,
            name: payload.values.name,
            price: payload.values.price,
            quantity: payload.values.quantity
          },
          headers: { token }
        })
          .then((updated) => {
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    checkout (context) {
      return new Promise((resolve, reject) => {
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/users/${id}/checkout`,
          url: `http://35.186.155.204/users/${id}/checkout`,
          headers: {
            token
          }
        })
          .then((msg) => {
            resolve(msg)
          })
          .catch((err)=>{
            reject(err)
          })
      })
    },
    deleteProduct (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        Axios({
          method: 'delete',
          // url: `http://localhost:3000/products/${payload}`,
          url: `http://35.186.155.204/products/${payload}`,
          headers: {token}
        })
          .then((msg) => {
            resolve(msg)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    search (context, payload) {
      context.commit('SEARCH', payload)
    },
    transactions (context, payload) {
      let token = localStorage.getItem('token')
      let admin = localStorage.getItem('admin')
      return new Promise((resolve, reject) => {
        Axios({
          method: 'get',
          // url: 'http://localhost:3000/users/transactions',
          url: 'http://35.186.155.204/users/transactions',
          headers: { token }
        })
          .then((transactions) => {
            resolve(transactions)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  modules: {

  }
})
