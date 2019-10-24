'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import errorHandler from '@/helpers/errorHandler'

Vue.use(Vuex)

// Simple store to hold user data outside component scope
export default new Vuex.Store({
  state: {
    baseUrl: 'https://server-gamestop.andreassosilo.co',
    email: '',
    id: '',
    isAdmin: false,
    allProducts: [],
    cart: [],
    isLogin: false
  },
  mutations: {
    changeIsAdmin (state, data) {
      state.isAdmin = data
    },
    changeIsLogin (state, data) {
      state.isLogin = data
    },
    setProduct (state, data) {
      state.allProducts = data
    },
    setCart (state, data) {
      state.cart = data
    }
  },
  actions: {
    fetchAllProducts (context, data) {
      axios({
        url: `${this.state.baseUrl}/products`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setProduct', data)
        }).catch(errorHandler)
    },
    fetchCart (context, data) {
      axios({
        url: `${this.state.baseUrl}/users/cart`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('setCart', data)
        }).catch(errorHandler)
    }
  }
})
