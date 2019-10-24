import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Products from './views/Products.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'products',
      component: Products
    },
    {
      path: '/about',
      name: 'about',
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          next('/login')
        } else {
          next()
        }
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
