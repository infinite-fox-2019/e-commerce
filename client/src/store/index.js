import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allitems: [],
    isLogin: false,
    cart: [],
    user: {}
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
    },
    SET_CART (state, payload) {
      state.cart = payload
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
      axios({
        method: 'patch',
        url: '/users/add' + payload.idItem
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
    }
  },
  modules: {
  }
})
