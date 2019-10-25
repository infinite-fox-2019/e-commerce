import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Product from './views/Product.vue'
import Admin from './views/Admin.vue'

// nested route Product
import Book from './views/NestedRoute/ProductNested/Book.vue'
import Transaction from './views/NestedRoute/ProductNested/Transaction.vue'

// nested route Admin
import Video from './views/NestedRoute/AdminNestedRoute/Video.vue'
import User from './views/NestedRoute/AdminNestedRoute/User.vue'
import Setting from './views/NestedRoute/AdminNestedRoute/Setting.vue'
import Createe from './views/NestedRoute/AdminNestedRoute/Create.vue'
import AllTransactions from './views/NestedRoute/AdminNestedRoute/AllTransactions.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/product/:name',
      name: 'product',
      component: Product,
      children: [
        {
          path: 'book/:id',
          name: 'book',
          component: Book
        },
        {
          path: 'transaction/:id',
          name: 'transaction',
          component: Transaction
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: 'profile' */ './views/Profile.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/login',
      name: 'login',
      component: () => import(/**/'./views/Login.vue')
    }, {
      path: '/register',
      name: 'register',
      component: () => import(/**/'./views/Register.vue')
    }, {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'video',
          name: 'video',
          component: Video
        },
        {
          path: 'user',
          name: 'user',
          component: User
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting
        },
        {
          path: 'create',
          name: 'create',
          component: Createe
        },
        {
          path: 'transactionAdmin',
          name: 'transactionAdmin',
          component: AllTransactions
        }
      ]
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Contact.vue') // memanggil component ketika di click
    }
  ]
})
