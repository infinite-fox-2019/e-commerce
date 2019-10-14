const router = require('express').Router()
const productRouter = require('./product')
const userRouter = require('./user')
const superuserRouter = require('./superuser')
const cartRouter = require('./cart')
const transactionRouter = require('./transaction')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/superuser', superuserRouter)
router.use('/cart', cartRouter)
router.use('/transaction', transactionRouter)

module.exports = router