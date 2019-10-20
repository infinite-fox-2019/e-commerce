import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allitems: [],
    isLogin: false,
    cart: [],
    history: [],
    user: {},
    itemDetail: {},
    heightScroll: '',
    admintrx: [],
    trxpending: []
  },
  mutations: {
    SET_ALL_ITEMS (state, payload) {
      state.allitems = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_USERINFO (state, payload) {
      state.user = payload
      state.cart = payload.cart
      state.history = payload.history
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SEND_DETAIL (state, payload) {
      state.itemDetail = payload
    },
    SET_INCOME (state, payload) {
      state.admintrx = payload
    },
    SET_PENDING_INCOME (state, payload) {
      state.trxpending = payload
    }
  },
  actions: {
    fetchItems ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/items'
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ALL_ITEMS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchItemsTag ({ commit, dispatch }, payload) {
      if (payload.tag !== 'all') {
        axios({
          method: 'get',
          url: `/items/tag/${payload.tag}`
        })
          .then(({ data }) => {
            console.log(data)
            commit('SET_ALL_ITEMS', data)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        dispatch('fetchItems')
      }
    },
    addCart ({ commit }, payload) {
      console.log(payload)
      axios({
        method: 'patch',
        url: '/users/add/' + payload.itemId,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          let cart = data.cart
          commit('SET_CART', cart)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchUserInfo ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/users/account',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_USERINFO', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getItemDetail ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/items/' + payload
      })
        .then(({ data }) => {
          console.log(data)
          commit('SEND_DETAIL', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeCart ({ commit }, payload) {
      console.log(payload)
      axios({
        method: 'patch',
        url: '/users/remove/' + payload.itemId,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          let cart = data.cart
          commit('SET_CART', cart)
        })
        .catch(err => {
          console.log(err)
        })
    },
    payNow ({ commit }, payload) {
      axios({
        method: 'post',
        url: '/transactions/',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_USERINFO', data.user)
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeDelStatus ({ commit, dispatch }, payload) {
      axios({
        method: 'patch',
        url: '/transactions/delivery/' + payload,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          status: true
        }
      })
        .then(({ data }) => {
          console.log(data.message)
          dispatch('fetchUserInfo')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchTransactionAdm ({ commit }, payload) {
      axios({
        method: 'post',
        url: '/transactions/income',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          deliveryStatus: true
        }
      })
        .then(({ data }) => {
          commit('SET_INCOME', data.transactions)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchPendingAdm ({ commit }, payload) {
      axios({
        method: 'post',
        url: '/transactions/income',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          deliveryStatus: false
        }
      })
        .then(({ data }) => {
          commit('SET_PENDING_INCOME', data.transactions)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
