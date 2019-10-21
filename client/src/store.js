import Vue from 'vue'
import Vuex from 'vuex'
import axios from './components/configs/axios'
import Swal from 'sweetalert2'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    isLogin: false,
    transactions: [],
    carts: [],
    isAdmin: false
  },
  mutations: {
    GET_PRODUCTS (state, data) {
      state.products = data
    },
    GET_ONE_PRODUCT (state, data) {
      state.product = data
    },
    SET_LOCAL_STORAGE (state, data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      state.isLogin = true
    },
    LOGOUT (state) {
      localStorage.clear()
      state.isLogin = false
      state.isAdmin = false
    },
    LOGGED (state) {
      state.isLogin = true
    },
    GET_TRANSACTIONS (state, data) {
      state.transactions = data
    },
    GET_CARTS (state, data) {
      state.carts = data
    },
    ADMIN (state, data) {
      state.isAdmin = true
    }
  },
  actions: {
    getProducts (context) {
      axios({
        url: '/products',
        method: 'get'
      })
        .then(({ data }) => {
          context.commit('GET_PRODUCTS', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    getOneProduct (context, productId) {
      axios({
        url: `products/${productId}`,
        method: 'get'
      })
        .then(({ data }) => {
          context.commit('GET_ONE_PRODUCT', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    login (context, payload) {
      axios({
        url: `users/login`,
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          if(data.role  === 'admin'){
          context.commit('ADMIN')
          }
          context.commit('SET_LOCAL_STORAGE', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    logout (context) {
      context.commit('LOGOUT')
    },
    register (context, payload) {
      axios({
        url: `/users/register`,
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          if(data.role  === 'admin'){
            context.commit('ADMIN')
            }
          context.commit('SET_LOCAL_STORAGE', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    admin(context){
      context.commit('ADMIN')
    },
    logged (context) {
      context.commit('LOGGED')
    },
    addToCart (context, { productId, qty }) {
      axios({
        url: '/users/cart',
        method: 'post',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          productId: productId,
          qty
        }
      })
        .then(({ data }) => {
          return axios({
            url: `products/${productId}`,
            method: 'get'
          })
        })
        .then(({ data }) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Succes Add To The Cart',
            showConfirmButton: false,
            timer: 1500
          })
          context.commit('GET_ONE_PRODUCT', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    getCarts (context) {
      axios({
        url: '/users/cart',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('GET_CARTS', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    deleteCart (context, CartId) {
      axios({
        url: `/users/cart/${CartId}`,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCarts')
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    checkout (context) {
      axios({
        url: '/transactions',
        method: 'post',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCarts')
          context.dispatch('getTrasactions')
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    getTrasactions (context) {
      axios({
        url: '/transactions',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('GET_TRANSACTIONS', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    changeStatus(context, payload){
     axios({
        url: `/transactions/${payload.transactionsId}`,
        method: 'patch',
        headers: {
          token: localStorage.getItem('token')
        },
        data : {
          status: `${payload.status}`
        },
      })
      .then(({ data }) => {
        if(context.state.isAdmin){
          context.dispatch('getTrasactionsAdmin')        
        } else{
          context.dispatch('getTrasactions')
        }
      })
      .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    getTrasactionsAdmin (context) {
      axios({
        url: '/transactions/admin',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('GET_TRANSACTIONS', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    deleteProduct (context, productId){
      axios({
        url: `/products/${productId}`,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        context.dispatch('getProducts')

      })
      .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    }
  }
})
