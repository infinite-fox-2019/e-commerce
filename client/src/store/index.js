import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    userRole: ''
  },
  mutations: {
    login (state) {
      state.isLogin = true
    },
    logout (state) {
      state.isLogin = false
      state.userRole = ''
    },
    setRole (state, payload) {
      state.userRole = payload
    }
  },
  actions: {

  }
})
