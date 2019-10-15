const router = require('express').Router()
const ProductController = require('../controllers/productController')
const {authentication, authorization} = require('../middleware/auth')

router.use(authentication, authorization)

router.get('/', ProductController.productList)
router.post('/', ProductController.addProduct)
router.put('/:id', ProductController.editProduct)
router.patch('/:id', ProductController.editProductQty)
router.delete('/:id', ProductController.removeProduct)

module.exports = router