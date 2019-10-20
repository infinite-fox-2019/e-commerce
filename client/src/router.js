import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import MainContent from './views/MainContent.vue'
import AddProduct from './views/AddProduct.vue'
import Cart from './views/Cart.vue'
import EditProduct from './views/EditProduct.vue'
import Opening from './views/Opening.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'opening',
      component: Opening
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'users',
      component: Home,
      props: true,
      children: [
        { name: '', path: '', component: MainContent },
        { name: 'cart', path: 'cart', component: Cart },
        { name: 'addProduct', path: 'addProduct', component: AddProduct },
        { name: 'editProduct', path: 'editProduct', component: EditProduct, props: true }
      ]
    }
    // {
    //   path: '/addProduct',
    //   name: 'addProduct',
    //   component: AddProduct
    // },
    // {
    //   path: '/editProduct',
    //   name: 'editProduct',
    //   component: EditProduct,
    //   props: true
    // },
    // {
    //   path: '/cart',
    //   name: 'cart',
    //   component: Cart,
    //   props: true
    // }
  ]
})
