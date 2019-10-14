const Router = require('express').Router();
const UserController = require('../controllers/user')

Router.post('/register/admin', UserController.createAdmin)
Router.post('/register', UserController.create)
Router.post('/login', UserController.login)

module.exports = Router;