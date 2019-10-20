const router = require('express').Router()
const ProductController = require('../controllers/productController')
const {authentication, authorization} = require('../middleware/auth')
const gcsUpload = require('../middleware/uploadImageGCS')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: 'key_api.json',
    bucketName: 'dipaecommerce'
  }
})

router.get('/', ProductController.productList)
router.use(authentication, authorization)
router.post('/', upload.single('file'), ProductController.addProduct)
router.put('/:id', ProductController.editProduct)
router.patch('/:id', ProductController.editProductQty)
router.delete('/:id', ProductController.removeProduct)

module.exports = router