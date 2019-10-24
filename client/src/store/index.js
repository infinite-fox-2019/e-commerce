import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    name: '',
    role: '',
    products: []
  },
  mutations: {
    login (state, payload) {
      state.name = payload.name
      state.role = payload.role
      state.isLogin = true
    },
    logout (state) {
      state.name = ''
      state.role = ''
      state.isLogin = false
    },
    products (state, payload) {
      state.products = payload
    }
  },
  actions: {
    getproducts () {
      axios({
        url: 'http://localhost:3000/products',
        method: 'get'
      })
        .then(({ data }) => {
          this.commit('products', data)
          // console.log(data);
        })
        .catch(console.log)
    }
  },
  modules: {}
})
