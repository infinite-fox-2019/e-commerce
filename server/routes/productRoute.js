const route = require('express').Router()
const productController = require('../controllers/productController');


route.patch('/:id', productController.update)
route.delete('/:id', productController.delete)
route.get('/:id', productController.findById)
route.post('/', productController.create)
route.get('/', productController.find)


module.exports = route