import Vue from "vue";
import Vuex from "vuex";
// import router from "../router";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false,
        questions: []
    }, 
    mutations: {
        CHANGEISLOGIN (state, payload) {
            state.isLogin = payload;
        }
    },
    actions: {
        changeIsLogin (context, payload) {
            context.commit('CHANGEISLOGIN', payload);
        }
    }
})

