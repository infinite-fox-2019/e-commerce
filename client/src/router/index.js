import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import Landing from "@/views/Landing.vue";
import Home from "@/views/Home.vue";
import Cart from "@/views/Cart.vue";
import Transaction from "@/views/Transaction.vue";
import TransactionAll from "@/views/TransactionAll.vue";
import TransactionDetail from "@/views/TransactionDetail.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import ProductAdd from "@/views/Product/Add.vue";
import ProductEdit from "@/views/Product/Edit.vue";
import ProductList from "@/views/Product/List.vue";
import ProductShow from "@/views/Product/Show.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "list",
          component: ProductList
        },
        {
          path: "add",
          component: ProductAdd
        },
        {
          path: "edit/:id",
          name: "edit",
          component: ProductEdit
        },
        {
          path: "show/:id",
          name: "show",
          component: ProductShow
        }
      ]
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      beforeEnter: (to, from, next) => {
        if (store.state.token === null) next("/login");
        else next();
      }
    },
    {
      path: "/transaction/all",
      name: "transaction-all",
      component: TransactionAll,
      beforeEnter: (to, from, next) => {
        if (store.state.isAdmin === false) next("/");
        else next();
      }
    },
    {
      path: "/transaction",
      name: "transaction",
      component: Transaction,
      beforeEnter: (to, from, next) => {
        if (store.state.token === null) next("/login");
        else next();
      }
    },
    {
      path: "/transaction/:id",
      name: "transaction-detail",
      component: TransactionDetail,
      beforeEnter: (to, from, next) => {
        if (store.state.token === null) next("/login");
        else next();
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
