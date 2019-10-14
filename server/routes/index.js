const router = require('express').Router()
const userRouter = require('./user')
const produtcRouter = require('./product')
const transactionRouter = require('./transaction')

router.use('/user', userRouter)
router.use('/products', userRouter)
router.use('/transactions', transactionRouter)

module.exports = router