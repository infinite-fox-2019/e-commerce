import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'
import Checkout from './views/Checkout.vue'
import Register from './views/Register.vue'
import About from './views/About.vue'
import AddAdmin from './views/AddAdmin.vue'
import AddProduct from './views/AddProduct.vue'
import jwt from 'jsonwebtoken'

Vue.use(VueRouter)

const rout = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/about/:id',
          name: 'about',
          component: About
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
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/addadmin',
      name: 'addadmin',
      component: AddAdmin
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: AddProduct
    }
  ]
})

rout.beforeEach((to, from, next)=>{
  const token = localStorage.getItem('token')
  // const user = jwt.verify(token, 'secret')
  if(to.name == 'login' || to.name == 'register' || to.name == 'home' || to.name == 'about'){
    next()
  }
  // else if(to.name == 'addadmin' && user.status == 'admin'){
  //   next()
  // }
  // else if(to.name == 'addproduct' && user.status == 'admin'){
  //   next()
  // }
  else if(token){
    next()
  }
  else{
    next('/login')
  }
})

export default rout
