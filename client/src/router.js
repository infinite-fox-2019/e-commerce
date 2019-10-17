import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: 'profile' */ './views/Profile.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/product/:name',
      name: 'product',
      component: () => import(/* webpackChunkName: "about" */ './views/Product.vue') //memanggil component ketika di click
    },{
      path: '/login',
      name: 'login',
      component: () => import(/**/'./views/Login.vue')
    },{
      path: '/register',
      name: 'register',
      component: () => import(/**/'./views/Register.vue')
    },{
      path: '/admin',
      name: 'admin',
      component: () => import(/**/ './views/Admin.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Contact.vue') //memanggil component ketika di click
    }
  ]
})
