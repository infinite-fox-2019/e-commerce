const Router = require('express').Router();
const UserController = require('../controllers/user')

Router.post('/users/register', UserController.create)

module.exports = Router;