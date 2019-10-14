const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {authentication, authorization} = require('../middlewares/auth')

router.use(authentication)
router.post('/',CartController.create)

module.exports = router
