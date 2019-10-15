const Router = require('express').Router(),
    ProductController = require('../controllers/product')

Router.post('/', ProductController.create)
Router.get('/', ProductController.read)
Router.put('/:id', ProductController.update)
Router.delete('/:id', ProductController.delete)

module.exports = Router;
