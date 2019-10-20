const router = require('express').Router()
const CartController = require('../controllers/cart')
const { authentication } = require('../middlewares/auth')
const { cartAuthorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/', CartController.find)
router.post('/', CartController.add)
router.delete('/:id', cartAuthorization, CartController.delete)

module.exports = router