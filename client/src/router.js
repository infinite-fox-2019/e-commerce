import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'
import Transactions from './views/Transactions.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'products/:id',
          name: 'detailProduct',
          component: Detail
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/transactions',
      name: 'transactons',
      component: Transactions
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
