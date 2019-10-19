import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'products',
    component: Products
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/add-product',
    name: 'addProduct',
    component: () => import('../views/AddProduct.vue')
  },
  {
    path: '/products/:id',
    name: 'productDetail',
    component: () => import('../views/ProductDetail.vue')
  },
  {
    path: '/update-product/:id',
    name: 'updateProduct',
    component: () => import('../views/UpdateProduct.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
