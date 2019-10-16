const router = require('express').Router()
const ProductController = require('../controllers/product')
const images = require('../helpers/images')

router.post('/', images.multer.single('image'), images.sendUploadToGCS, ProductController.add)
router.get('/', ProductController.find)
router.delete('/:id', ProductController.remove)

module.exports = router