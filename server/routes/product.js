const router = require('express').Router()
const productController = require('../controllers/product')
const { Authentication, Authorization } = require('../middlewares/auth')
const { multer, sendUploadToGCS } = require('../middlewares/multer')

router.get('/', productController.find)
router.get('/search', productController.search)
router.get('/:id', productController.findById)
router.use(Authentication)
router.post('/', multer.single('image'), sendUploadToGCS, Authorization, productController.create)
router.put('/:id', Authorization, productController.update)
router.patch('/stock/:id', Authorization, productController.updateStock)
router.patch('/image/:id', Authorization, productController.updateImage)
router.delete('/:id', Authorization, productController.remove)

module.exports = router