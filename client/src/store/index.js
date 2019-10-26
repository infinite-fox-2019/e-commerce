import Vue from "vue";
import Vuex from "vuex";
// import router from "./router";
import axios from "axios";
const server = "http://34.87.112.227";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    isAdmin: false,
    products: [],
    carts: []
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    removeToken(state) {
      localStorage.removeItem("token");
      state.token = null;
    },
    setAdmin(state, payload) {
      state.isAdmin = payload;
    },
    initProduct(state, payload) {
      let products = [];
      for (let i = 0; i < payload.data.length; i++) {
        const product = payload.data[i];
        products.push(product);
      }
      state.products = products;
    }
  },
  actions: {
    checkAdmin({ commit, state }) {
      if (state.token === null) commit("setAdmin", false);
      else {
        axios({
          method: "get",
          url: "/users/isAdmin",
          baseURL: server,
          headers: {
            token: state.token
          }
        }).then(({ data }) => {
          commit("setAdmin", data.isAdmin);
        });
      }
    }
  }
});
