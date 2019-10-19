import api from '@/api/api'

const state = {
  products: [],
  isLoading: true
}

const getters = {}

const actions = {
  async findAll({ commit }) {
    const { data: products } = await api({
      method: 'get',
      url: `/products`
    })
    commit('setProducts', products)
  },
  create({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: product } = await api({
          method: 'post',
          url: '/products/create',
          headers: {
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWFjNDYwYzA4N2NhMjg0ZmIwYzIyZCIsImVtYWlsIjoia2V2QG1haWwuY29tIiwiaWF0IjoxNTcxNDg2NDU0fQ.M42t2LXEHC9dqZlXw8x4lTwkGsNAl0j3N7Fz8tEDPZs'
          },
          data: payload
        })
        if (product) {
          resolve(product)
        }
      } catch (err) {
        reject(err)
      }
    })
  },
  destroy({ commit }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: res } = await api({
          method: 'delete',
          url: `/products/${id}/delete`,
          headers: {
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWFjNDYwYzA4N2NhMjg0ZmIwYzIyZCIsImVtYWlsIjoia2V2QG1haWwuY29tIiwiaWF0IjoxNTcxNDg2NDU0fQ.M42t2LXEHC9dqZlXw8x4lTwkGsNAl0j3N7Fz8tEDPZs'
          }
        })
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }
}

const mutations = {
  setProducts(state, products) {
    state.products = products
    state.isLoading = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
