const router = require('express').Router()
const cartController = require('../controllers/cartController')
const { authentication } = require('../middleware/auth')

router.use(authentication)

router.get('/', cartController.cartList)

module.exports = router