import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// const host = `http://localhost:3000`
const host = `https://e-commerce-api.sigitariprasetyo.xyz`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    dataProduct: {},
    isAdmin: false,
    detailProduct: {},
    username: '',
    searchProduct: {},
    carts: []
  },
  mutations: {
    IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    IS_ADMIN (state, payload) {
      state.isAdmin = payload
    },
    USERNAME (state, payload) {
      state.username = payload
    },
    ALL_PRODUCT (state, payload) {
      state.dataProduct = payload
    },
    DETAIL_PRODUCT (state, payload) {
      state.detailProduct = payload
    },
    SEARCH_PRODUCT (state, payload) {
      state.searchProduct = payload
    },
    CARTS (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    auth ({ commit }) {
      if (localStorage.getItem('role')) {
        if (localStorage.getItem('role') === 'admin') {
          commit('IS_LOGIN', true)
          commit('IS_ADMIN', true)
        } else {
          commit('IS_LOGIN', true)
          commit('IS_ADMIN', false)
        }
      } else {
        commit('IS_LOGIN', false)
        commit('IS_ADMIN', false)
      }
    },
    getUsername ({ commit }) {
      let theUsername = localStorage.getItem('username')
      commit('USERNAME', theUsername)
    },
    getProduct ({ commit }) {
      axios({
        method: 'get',
        url: `${host}/product`
      })
        .then(({ data }) => {
          let products = []
          data.forEach((el, i) => {
            products.push(el)
          })
          commit('ALL_PRODUCT', products)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    findOne ({ commit }, payload) {
      axios({
        method: 'get',
        url: `${host}/product/${payload}`
      })
        .then(({ data }) => {
          commit('DETAIL_PRODUCT', data)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    handleSearch ({ commit }, payload) {
      axios({
        method: 'get',
        url: `${host}/search?q=${payload}`
      })
        .then(({ data }) => {
          commit('SEARCH_PRODUCT', data)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    editProduct ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'patch',
          url: `${host}/product/edit/${payload.id}`,
          data: payload.data,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteProduct ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: `${host}/product/delete/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addToCart ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: `${host}/addToCart/${payload.id}`,
          data: {
            qty: payload.qty
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getCart ({ commit }, payload) {
      axios({
        method: 'get',
        url: `${host}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('CARTS', data)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    deleteCart ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: `${host}/carts/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(respon => {
            resolve(respon)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    register ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: `${host}/user/register`,
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('role', data.role)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
