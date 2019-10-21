const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authentication, authorizationProduct } = require('../middleware/auth')
const upload = require('../middleware/gcsUpload')

router.post('/', authentication, authorizationProduct, upload.single('image'), ProductController.create)
router.get('/', ProductController.find)
router.get('/:id', ProductController.findById)
router.patch('/:id', authentication, authorizationProduct, upload.single('image'), ProductController.update)
router.delete('/:id', authentication, authorizationProduct,  ProductController.delete)

module.exports = router