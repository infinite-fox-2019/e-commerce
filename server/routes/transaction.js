const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authentication, authorization } = require('../middleware/auth')
const multer = require('../middleware/multer')
const gcs = require('../middleware/gcs')


router.get('/product', ProductController.findAll)
router.post('/addProduct', authentication, authorization, multer.single('image'), gcs, ProductController.addProduct)
router.get('/search', ProductController.searchProduct)
router.get('/product/:id', ProductController.findOne)
router.patch('/product/edit/:id', authentication, authentication, ProductController.editProduct)
router.delete('/product/delete/:id', authentication, authorization, ProductController.deleteProduct)

router.post('/addToCart/:idProduct', authentication, ProductController.addToCart)
router.get('/carts', authentication, ProductController.showCart)
router.delete('/carts/:id', authentication, ProductController.deleteCart)

module.exports = router