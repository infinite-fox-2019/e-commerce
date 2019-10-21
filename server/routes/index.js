const express = require('express')
const userRoute = require ('./user')
const productRoute = require ('./product')
const shoppingCartRoute = require ('./shoppingCart')
const router = express.Router() 

router.use( '/users', userRoute )
router.use( '/products', productRoute)
router.use('/carts', shoppingCartRoute)


module.exports = router