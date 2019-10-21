const router = require('express').Router()
const user = require('./user')
const transaction = require('./transaction')


router.use('/user', user)
router.use('/', transaction)

module.exports = router