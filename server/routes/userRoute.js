const route = require('express').Router();
const UserController = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/verify', UserController.verify)
route.post('/cart', authenticate, UserController.addCart)
route.patch('/cart', authenticate, UserController.updateCart)
route.delete('/cart', authenticate, UserController.checkout)

module.exports = route;