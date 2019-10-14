const Router = require('express').Router();
const UserController = require('../controllers/user')

Router.post('/register', UserController.create)

module.exports = Router;