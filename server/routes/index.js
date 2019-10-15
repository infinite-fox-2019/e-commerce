const router = require('express').Router()
const UserController = require('../controllers/user')
const CartRoutes = require('./cartRoutes')
const ProductRoutes = require('./productRoutes')

router.use('/products', ProductRoutes)
router.use('/carts', CartRoutes)
router.post('/register', UserController.register)
router.post('/login', UserController.login)


module.exports = router