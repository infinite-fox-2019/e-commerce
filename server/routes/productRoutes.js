const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const images = require('../helpers/images')
const {authentication, adminAuthorization} = require('../middlewares/auth')


router.post('/',authentication,adminAuthorization,images.multer.single('image'),images.sendUploadToGCS,ProductController.create)
router.get('/',ProductController.read)
router.patch('/:id',authentication,adminAuthorization,images.multer.single('image'),images.sendUploadToGCS,ProductController.update)
router.delete('/:id',authentication,adminAuthorization,ProductController.delete)
module.exports = router