const router = require('express').Router();
const users = require('./user')
const items = require('./item')
const transavtions = require('./transaction')

router.use('/users', users)
router.use('/items', items)
router.use('/transactions', transavtions)
module.exports = router