import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({

    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */'./views/Login.vue'),
            children: [
                {
                    path: '',
                    name: 'login',
                    component: () => import(/* webpackChunkName: "loginForm" */ './views/subrouter/login/LoginForm')
                },
                {
                    path: 'register',
                    component: () => import(/* webpackChunkName: "loginForm" */ './views/subrouter/login/RegisterForm')
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
            beforeEnter(to, from, next) {
                store.dispatch('user/verifyUser')
                    .then(data => {
                        if (data.role === 'admin') next()
                        else next('/')
                    })
                    .catch(err => next('login'))
            }
        },
        {
            path: '/cart',
            component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue'),
            children: [
                {
                    path: '',
                    name: 'cart',
                    component: () => import(/* webpackChunkName: "cartProductList" */ './views/subrouter/cart/ProductList')
                },
                {
                    path: '/checkout',
                    name: 'checkout',
                    component: () => import(/* webpackChunkName: "checkout" */ './views/subrouter/cart/Checkout')
                }
            ],
            beforeEnter(to, from, next) {
                store.dispatch('user/verifyUser')
                    .then(() => {
                        next()
                    })
                    .catch(() => next('login'))
            }
        },
        {
            path: '/transaction',
            component: () => import(/* webpackChunkName: "transaction" */ './views/Transaction.vue'),
            beforeEnter(to, from, next) {
                store.dispatch('user/verifyUser')
                    .then(() => {
                        next()
                    })
                    .catch(() => next('login'))
            },
            children: [
                {
                    path: '',
                    name: 'transaction',
                    component: () => import(/* webpackChunkName: "transactionList" */ './views/subrouter/transaction/List.vue')
                },
                {
                    path: ':id',
                    name: 'single-transaction',
                    component: () => import(/* webpackChunkName: "singleTransaction" */ './views/subrouter/transaction/Single.vue')
                }
            ]
        }
    ],

})

export default router