import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/DetailProduct.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    children: [
      {
        path: '/',
        name: 'adminpage',
        component : () => import('../views/Adminpage.vue')
      },
      {
        path: 'addproduct',
        name :'addproduct',
        component: () => import('../views/ProductForm.vue')
      },
      {
        path: 'editproduct/:id',
        name : 'editproduct',
        component: () => import('../views/EditForm.vue')
      },
      {
        path: 'transaction',
        name : 'transaction',
        component: () => import('../views/Transaction.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
