const Router = require('express').Router();
const UserController = require('../controllers/user')
const authentication = require('../middlewares/authentication')

Router.post('/register/admin', UserController.createAdmin)
Router.post('/register', UserController.create)
Router.post('/login', UserController.login)
Router.get('/verify', authentication, UserController.verifyUser)
Router.post('/verify/username', UserController.checkUser)
Router.post('/verify/email', UserController.checkEmail)

module.exports = Router;