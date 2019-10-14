const router = require('express').Router()
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')
const userRouter = require('./userRoutes')

router.use('/user',userRouter)
router.use('/products',productRoutes)
router.use('/carts',cartRoutes)

module.exports = router