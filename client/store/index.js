import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProduct: [],
    islogin: false,
    user: '',
    isRole: ''
  },
  mutations: {
    FETCH_DATA (state, payload) {
      state.allProduct = payload;
    },
    CHECK_LOGIN (state, payload) {
      state.islogin = true;
      state.isRole = payload.role
      state.user = payload;
    },
    LOGOUT_USER (state, payload) {
      state.isRole = payload.isRole;
      state.islogin = payload.islogin
    },
    LOGIN_USER (state, payload) {
      state.islogin = true;
      state.isRole = payload.role
    },
    LOGIN_TRUE (state, payload) {
      state.islogin = true;
    }
  },
  actions: {
    fetchData ({ commit }) {
      if(localStorage.getItem('token')){
        return new Promise ((resolve, reject) => {
          axios({
            method : 'get',
            url: 'http://dreamcarserver.dreamcarofficial.com/brands'
          })
          .then(({data})=>{
            commit('FETCH_DATA', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
        })
      }
    },
    checkLogin ( context ) {
      if(localStorage.getItem('token')){
        axios({
          method: 'get',
          url: 'http://dreamcarserver.dreamcarofficial.com/findprofile',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          context.commit('CHECK_LOGIN', data)
          context.dispatch('fetchData')
        })
        .catch(console.log)
      }
    },
    logout ({ commit }) {
      const payload = {
        islogin: false,
        isrole: ''
      }
      commit('LOGOUT_USER', payload)
    },
    login ( context, payload ) {
      return new Promise ((resolve, reject) =>{
        axios({
          method: 'post',
          url: 'http://dreamcarserver.dreamcarofficial.com/login',
          data: payload
        })
          .then(({data}) => {
            context.commit('LOGIN_USER', data)
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
