const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.get('/:id', UserController.findOne)

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/cart', UserController.addToCart)

router.patch('/cart/:id', UserController.deleteCart)

module.exports = router