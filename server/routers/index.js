const router = require('express').Router()
const usersRouter = require('./users')
const productsRouter = require('./products')
const cartsRouter = require('./carts')

router.use('/users', usersRouter)
router.use('/products', productsRouter)
router.use('/carts', cartsRouter)

module.exports = router