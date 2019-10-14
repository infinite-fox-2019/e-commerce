'use strict'

const router = require('express').Router()
const { UserController } = require('../controllers')
const { authentication } = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login-google', UserController.loginGoogle)

// For user -> add item to shopping cart
// router.post('/check', authentication, Controller.checkLogin)
router.get('/cart', authentication, UserController.getCart)
// router.post('/clear', authentication, Controller.clearCart)
// router.patch('/cart', authentication, Controller.updateCart)
router.post('/checkout', authentication, UserController.checkout)

module.exports = router
