import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../helpers/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    username: '',
    userRole: '',
    products: [],
    errMessages: '',
    isLogin: false,
    seriesDict: ['S.H.Figuarts', 'MAFEX', 'Figma', 'Mezco', 'Revoltech']
  },
  mutations: {
    SET_USER_ID (state, payload) {
      state.userId = payload
    },
    SET_USERNAME (state, payload) {
      state.username = payload
    },
    SET_USER_ROLE (state, payload) {
      state.userRole = payload
    },
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    LOGOUT (state, payload) {
      state.userId = ''
      state.username = ''
      state.userRole = ''
      state.isLogin = false
      localStorage.clear()
      router.push('/')
    },
    SET_ERR_MESSAGES (state, payload) {
      let messages = ''
      if (!payload.response) {
        messages = 'Connection failed'
      } else {
        payload.response.data.messages.forEach(message => {
          messages += message + '<br>'
        })
      }
      if (this.state.errMessages === messages) {
        messages += ' '
      }
      state.errMessages = messages
    }
  },
  actions: {
    register ({ commit }, payload) {
      axios.post('users/register', {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        admin_password: payload.admin_password
      })
        .then(({ data }) => {
          commit('SET_USER_ID', data.id)
          commit('SET_USERNAME', data.username)
          commit('SET_USER_ROLE', data.role)
          localStorage.setItem('userId', data.id)
          localStorage.setItem('username', data.username)
          localStorage.setItem('userRole', data.role)
          localStorage.access_token = data.access_token
          commit('SET_IS_LOGIN', true)
          router.push('/')
        })
        .catch(err => {
          commit('SET_ERR_MESSAGES', err)
        })
    },
    login ({ commit }, payload) {
      axios.post('/users/login', {
        username: payload.username,
        password: payload.password
      })
        .then(({ data }) => {
          commit('SET_USER_ID', data.id)
          commit('SET_USERNAME', data.username)
          commit('SET_USER_ROLE', data.role)
          localStorage.setItem('userId', data.id)
          localStorage.setItem('username', data.username)
          localStorage.setItem('userRole', data.role)
          localStorage.access_token = data.access_token
          commit('SET_IS_LOGIN', true)
          router.push('/')
        })
        .catch(err => {
          commit('SET_ERR_MESSAGES', err)
        })
    },
    getProducts ({ commit }, payload) {
      axios.get('/products')
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
        })
        .catch(console.log)
    },
    addProduct ({ commit }, payload) {
      let bodyFormData = new FormData()
      bodyFormData.append('file', payload.file)
      axios.post('/upload-single', bodyFormData)
        .then(({ data }) => {
          payload.image = data.file
          return axios.post('/products', payload, {
            headers: {
              access_token: localStorage.access_token
            }
          })
        })
        .then(({ data }) => {
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          commit('SET_ERR_MESSAGES', err)
        })
    },
    updateProductWithImage ({ commit }, payload) {
      let bodyFormData = new FormData()
      bodyFormData.append('file', payload.file)
      axios.post('/upload-single', bodyFormData)
        .then(({ data }) => {
          payload.image = data.file
          return axios.post(`/products/${payload.id}`, payload, {
            headers: {
              access_token: localStorage.access_token
            }
          })
        })
        .then(({ data }) => {
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          commit('SET_ERR_MESSAGES', err)
        })
    },
    updateProduct ({ commit }, payload) {
      axios.post(`/products/${payload.id}`, payload, {
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          router.push('/')
        })
        .catch(err => {
          commit('SET_ERR_MESSAGES', err)
        })
    },
    deleteProduct ({ commit }, payload) {
      axios.delete(`/products/${payload}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          router.push('/')
        })
        .catch(err => {
          commit('SET_ERR_MESSAGES', err)
        })
    }
  }
})
