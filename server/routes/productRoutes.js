const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
//auth
const upload = require('../helpers/upload')

router.get('/', ProductController.getall)
router.post('/',  upload.multer.single('image'), upload.sendUploadToGCS, ProductController.create)
router.delete('/:id', ProductController.delete)

module.exports = router