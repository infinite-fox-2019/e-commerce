const router = require('express').Router()
const userRouter = require('./userRoute')
const productRoute = require('./productRoute')
const transactionRoute = require('./transactionRoute')
const cartRoute = require('./cartRoute')

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'App is Running'
    })
})

router.use('/users', userRouter)
router.use('/products', productRoute)
router.use('/transactions', transactionRoute)
router.use('/carts', cartRoute)


module.exports = router