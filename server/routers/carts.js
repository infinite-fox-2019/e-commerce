const router = require('express').Router()
const CartController = require('../controllers/cart')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.get('/', CartController.find)
router.post('/', CartController.add)

module.exports = router