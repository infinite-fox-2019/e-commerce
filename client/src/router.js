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
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */'./views/Login.vue')
        }, {
            path: '/history',
            name: 'history',
            component: () => import(/* webpackChunkName: "transaction" */'./views/Transactions.vue')
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
                    .catch(err => next('/'))
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue'),
            beforeEnter(to, from, next) {
                store.dispatch('user/verifyUser')
                    .then(() => {
                        next()
                    })
                    .catch(() => next('/'))
            }
        }
    ],

})

export default router