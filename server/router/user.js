const router = require('express').Router()
const Controller = require('../controllers/user')
const { authentication } = require('../middlewares/auth')


router.get('/', authentication , Controller.findLoggedIn)
router.post('/register' , Controller.register)
router.post('/login', Controller.login)
router.patch('/', authentication ,Controller.edit)
router.patch('/addToCart', authentication , Controller.addToCart)
router.patch('/removeFromCart', authentication, Controller.removeFromCart)
router.patch('/checkout', authentication , Controller.checkout)

module.exports = router