import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showUserForm: false,
    loggedUser: null,
    errors: {
      login: [],
      register: [],
      addGame: []
    },
    errorToasts: {
      showLoginError: false,
      showRegisterError: false,
      showAddGameError: false
    }
  },
  mutations: {
    showUserFormSignIn: function (state) {
      state.showUserForm = true
    },
    hideUserFormSignIn: function (state) {
      state.showUserForm = false
    },
    storeErrors: function (state, error) {
      switch (error.type) {
        case 'login':
          state.errors.login.push(error.message)
          break
        case 'register':
          state.errors.register = error.message
          break
        default:
          console.log('error not registered, yet')
      }
    },
    clearErrors: function (state, type) {
      switch (type) {
        case 'login':
          state.errors.login = []
          break
        case 'register':
          state.errors.register = []
          break
        default:
          console.log('error not registered, yet')
      }
    },
    showError: function (state, error) {
      switch (error.type) {
        case 'login':
          state.errorToasts.showLoginError = true
          break
        case 'register':
          state.errorToasts.showRegisterError = true
          break
        default:
          console.log('error display not registered, yet')
      }
    },
    hideError: function (state, type) {
      switch (type) {
        case 'login':
          state.errorToasts.showLoginError = false
          break
        case 'register':
          state.errorToasts.showRegisterError = false
          break
        default:
          console.log('error display not registered, yet')
      }
    },
    logUser: function (state, data) {
      localStorage.setItem('token', data.token)
      state.loggedUser = data.user
    },
    logUserOut: function (state) {
      localStorage.clear('token')
      state.loggedUser = null
    }
  },
  actions: {
    login: function ({ commit }, user) {
      commit('clearErrors', 'login')
      commit('hideError', 'login')
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
          email: user.email,
          password: user.password
        }
      })
        .then(({ data }) => {
          commit('hideUserFormSignIn')
          commit('logUser', data)
        })
        .catch(({ response }) => {
          const error = {
            type: 'login',
            message: response.data
          }
          commit('storeErrors', error)
          commit('showError', error)
        })
    },
    register: function ({ commit }, user) {
      commit('clearErrors', 'register')
      commit('hideError', 'register')
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/register',
        data: {
          username: user.username,
          email: user.email,
          password: user.password
        }
      })
        .then(({ data }) => {
          commit('hideUserFormSignIn')
          commit('logUser', data)
        })
        .catch(({ response }) => {
          const error = {
            type: 'register',
            message: response.data
          }
          commit('storeErrors', error)
          commit('showError', error)
        })
    },
    logout: function ({ commit }) {
      commit('logUserOut')
    },
    addGame: function ({ commit }, game) {
      let formData = new FormData()
      formData.append('name', game.name)
      formData.append('description', game.description)
      formData.append('price', game.price)
      formData.append('stock', game.stock)
      formData.append('platform', game.chosenPlatform)
      formData.append('deal', game.deal)
      formData.append('file', game.image)
      axios({
        method: 'POST',
        url: 'http://localhost:3000/products/',
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem('token')
        },
        data: formData
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  modules: {
  }
})
