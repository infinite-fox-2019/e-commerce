const route = require('express').Router()
const productController = require('../controllers/productControlller');
const {isAdmin, authenticate, authorize} = require('../middlewares/auth');
const upload = require('../middlewares/gcs');

route.use(authenticate)
route.patch('/:id', isAdmin, upload.single('image'), productController.update)
route.delete('/:id', isAdmin,  productController.delete)
route.get('/:id', productController.findById)
route.post('/', isAdmin, upload.single('image'), productController.create)
route.get('/', productController.find)

module.exports = route