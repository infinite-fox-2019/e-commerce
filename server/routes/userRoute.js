const route = require('express').Router();
const UserController = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/verify', UserController.verify)
route.get('/cart', authenticate, UserController.getCart)
route.patch('/cart', authenticate, UserController.updateCart)
route.delete('/cart', authenticate, UserController.checkout)

module.exports = route;