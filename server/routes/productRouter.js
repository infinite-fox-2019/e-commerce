const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const multerHelp = require('../middlewares/multerHelper')

// search
router.post('/search/', ProductController.searchItem)
// get products
router.get('/', ProductController.getAll)
// get single product
router.get('/:id', ProductController.getOne)
// create product
router.post('/', multerHelp.multer.single('image'), multerHelp.sendUploadToGCS, ProductController.createOne)
// delete product
router.delete('/:id', ProductController.deleteOne)
// buy product
router.patch('/buy/:id', ProductController.buyProduct)
// change product
router.patch('/:id', ProductController.editOne)



module.exports = router