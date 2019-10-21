const router = require('express').Router()
const cartController = require('../controllers/cartController')
const { authentication,authorizationCart } = require('../middleware/auth')

router.use(authentication)

router.get('/', cartController.cartList)
router.post('/', cartController.addToCart) //cart pertama
router.get('/addItem', cartController.addOneItemToCart) //cart kedua
router.get('/addAmount', cartController.addAmountToSameItem) //cart ketiga
router.patch('/:productId', cartController.deleteItemFromCart)

module.exports = router