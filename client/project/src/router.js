import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Admin from './views/Admin.vue'
import User from './views/User.vue'
import UpdateProduct from './views/UpdateProduct.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      props: true
    },
    {
      path: '/update/:id',
      name: 'updateproduct',
      component: UpdateProduct,
      props: true
    }
  ]
})
