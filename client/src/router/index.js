import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/',
    name: 'products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'productDetail',
    component: () => import('../views/ProductDetail.vue'),
    children: [
      {
        path: '/products/:id/update',
        name: 'updateProduct',
        component: () => import('../views/UpdateProduct.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('access_token') && localStorage.getItem('userRole') === 'admin') {
            next()
          } else {
            next('/')
          }
        }
      }
    ]
  },
  {
    path: '/add-product',
    name: 'addProduct',
    component: () => import('../views/AddProduct.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token') && localStorage.getItem('userRole') === 'admin') {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Carts.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token') && localStorage.getItem('userRole') === 'customer') {
        next()
      } else {
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
