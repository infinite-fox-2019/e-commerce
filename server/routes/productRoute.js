const route = require('express').Router()
const productController = require('../controllers/productControlller');
const {isAdmin, authenticate, authorize} = require('../middlewares/auth');
const upload = require('../middlewares/gcs');

route.get('/', productController.find)
route.use(authenticate)
route.patch('/:id', isAdmin, upload.single('image'), productController.update)
// route.post('/cart', productController.findItems)
route.delete('/:id', isAdmin,  productController.delete)
route.get('/:id', productController.findById)
route.post('/', isAdmin, upload.single('image'), productController.create)

module.exports = route