const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const CartController = require('../controllers/cart')

router.post('/add', authentication, CartController.add)

module.exports = router