const router = require('express').Router()
const users = require('./user')
const products = require('./product')
const transaction = require('./transaction')

router.use('/user',users)
router.use('/product', products)
router.use('/transaction' , transaction)

module.exports = router