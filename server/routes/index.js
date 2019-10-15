const router = require('express').Router();
const users = require('../routes/user')
const items = require('../routes/item')

router.use('/users', users)
router.use('/items', items)

module.exports = router