const Router = require('express').Router();
const CartController = require('../controllers/cart');
const authentication = require('../middlewares/authentication')

Router.use(authentication)

Router.get('/', CartController.read)
Router.post('/', CartController.add)
Router.patch('/:id', CartController.remove)
Router.put('/', CartController.update)
Router.delete('/', CartController.delete)

module.exports = Router;