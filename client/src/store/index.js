import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: localStorage.getItem('pengabdisetan'),
    user: {},
    products: [],
    beforeSearch: [],
    activeproduct: null,
    totalCart: null,
    cart: {},
    transaction : []
  },

  mutations: {
    SEARCHFILTER(state, payload){
      let search = new RegExp(payload.toLowerCase())
      let products = state.beforeSearch
      let filtered = []
      products.forEach((product, i) => {
        let name = product.name
        let categories = product.category
        if(search.test(name.toLowerCase())){
          filtered.push(product)
        }
        let flag = false
        categories.forEach(category => {
          if(!search.test(name.toLowerCase()) && search.test(category.toLowerCase()))flag = true
        });
        if(flag)filtered.push(product)
      })
      state.products = filtered
    },
    LOGIN(state, payload) {
      state.user = payload
      state.isLogin = true
      if (payload.admin) state.isAdmin = 'a231kljklasd92131ajldajlsd'
      else state.isAdmin = null
    },
    LOGOUT(state) {
      state.user = {}
      state.isLogin = false
      state.isAdmin = null
    },
    CHECKLOGIN(state, payload) {
      state.user = payload,
        state.isLogin = true
      if (payload.admin) state.isAdmin = 'a231kljklasd92131ajldajlsd'
      else state.isAdmin = null
    },
    FETCHPRODUCT(state, payload) {
      state.products = payload
      state.beforeSearch = payload
    },
    FETCHTRANSACTION(state, payload){
      state.transaction = payload
    }
  },
  actions: {
    login(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'post',
          url: 'http://localhost:3000/user/login',
          data: payload
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            context.commit('LOGIN', data.user)
            localStorage.setItem('pengabdisetan', 'a231kljklasd92131ajldajlsd')
            resolve(data)
          })
          .catch(err => {
            reject(err.response.data.message)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('pengabdisetan')
      context.commit('LOGOUT')
    },
    register(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'post',
          url: 'http://localhost:3000/user/register',
          data: payload,
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    checklogin(context) {
      if (localStorage.getItem('token')) {
        Axios({
          method: 'get',
          url: 'http://localhost:3000/user',
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.commit('CHECKLOGIN', data)
          })
          .catch(err => {
            Swal(err.response.data.message)
          })
      }
    },


    fetchProduct(context, payload) {
      Axios({
        method: 'get',
        url: 'http://localhost:3000/product',
      })
        .then(({ data }) => {
          context.commit('FETCHPRODUCT', data)
        })
        .catch(err => {
          Swal(err)
        })
    },
    addProduct(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'post',
          url: 'http://localhost:3000/product',
          headers: { token: localStorage.getItem('token') },
          data: payload
        })
          .then(({ data }) => {
            context.dispatch('fetchProduct')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteProduct(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'delete',
          url: `http://localhost:3000/product/${payload._id}`,
          headers: { token: localStorage.getItem('token') },
          data: payload
        })
          .then(({ data }) => {
            context.dispatch('fetchProduct')
            resolve(data)
          })
          .catch(err => {
            reject(err.response.data.message)
          })
      })
    },
    patchProduct(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `http://localhost:3000/product/${payload.id}`,
          headers: { token: localStorage.getItem('token') },
          data: payload.data
        })
          .then(({ data }) => {
            context.dispatch('fetchProduct')
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addToCart(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: 'http://localhost:3000/user/addToCart',
          data: { productId: payload.id, qty: payload.qty },
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data)
            context.dispatch('checklogin')
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    removeFromCart(context, payload) {
      return new Promise(function (resolve, reject) {

        Axios({
          method: 'patch',
          url: 'http://localhost:3000/user/removeFromCart',
          headers: { token: localStorage.getItem('token') },
          data: { productId: payload._id }
        })
          .then(({ data }) => {
            resolve(data)
            context.dispatch('checklogin')
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkout(context, payload) {
      Axios({
        method: 'get',
        url: 'http://localhost:3000/product',
      })
        .then(({ data }) => {
          let cart = []
          context.commit('FETCHPRODUCT', data)
          data.forEach(prod => {
            payload.cart.forEach(cust => {
              if (prod._id === cust.product._id && !(prod.qty < cust.qty)) {
                for (let index = 0; index < cust.qty; index++) {
                  cart.push(prod._id)                  
                }
              } else if (prod._id === cust.product._id && (prod.qty < cust.qty)) {
                Swal("some of your item already purchased by another user, we automatically remove that item from your cart!")
              }
            })
          });
          return Axios({
            method: 'patch',
            url: 'http://localhost:3000/user',
            headers: { token: localStorage.getItem('token') },
            data: {
              cart
            }
          })
        })
        .then(response => {
          return new Promise(function (reslove, reject) {
            Axios({
              method: 'patch',
              url: 'http://localhost:3000/user/checkout',
              headers: { token: localStorage.getItem('token') }
            })
              .then(({ data }) => {
                reslove(data)
                context.dispatch('fetchProduct')
                context.dispatch('checklogin')
              })
              .catch(err => {
                reject(err)
              })
          })
        })
        .catch(err => {
          console.log(err.response)
        })

      // return new Promise(function(reslove,reject){
      //   Axios({
      //     method : 'patch',
      //     url : 'http://localhost:3000/user/checkout',
      //     headers : { token : localStorage.getItem('token')}
      //   })
      //   .then( ({ data}) => {
      //     reslove(data)
      //     context.dispatch('fetchProduct')
      //     context.dispatch('checklogin')
      //   })
      //   .catch(err => {
      //     reject(err)
      //   })
      // })
    },
    fetchTransaction(context, payload){
      Axios({
        method : 'get',
        url : 'http://localhost:3000/transaction',
        headers : { token : localStorage.getItem('token')}
      })
      .then( ({data}) => {
        context.commit('FETCHTRANSACTION' , data)
      })
      .catch(err => {
        Swal('sorry our server is under anak stm attack')
      })
    },
    confirmTransaction(context,payload){
      return new Promise(function(resolve,reject){
        Axios({
          method : 'patch',
          url : `http://localhost:3000/transaction/${payload}`,
          headers : { token : localStorage.getItem('token')}
        })
        .then( ({data}) => {
          resolve(data)
        })
        .catch( err => {
          reject(err)
        })
      })
    },
    userTransaction(context,payload){
      return new Promise(function(resolve,reject){
        Axios({
          method : 'get',
          url : 'http://localhost:3000/transaction/user',
          headers : { token : localStorage.getItem('token')}
        })
        .then( ({data}) => {
          resolve(data)
        })
        .catch( err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})


// items: [
//   {
//       product: {
//           type: Schema.Types.ObjectId,
//           ref: 'product'
//       },
//       qty: {
//           type: Number
//       }
//   }
// ],