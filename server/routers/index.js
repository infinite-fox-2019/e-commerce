const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')

router.get('/', (req,res) => {
  res.status(200).json({message: "Data connected"})
})

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

module.exports = router