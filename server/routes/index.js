const Router = require('express').Router();
const user = require('./user')
const product = require('./product')
const cart = require('./cart')
const transaction = require('./transaction')

Router.get('/', (req, res) => res.status(200).json({ message: "Server Test Ok!" }))

Router.use('/users', user)
Router.use('/products', product)
Router.use('/cart', cart)
Router.use('/transactions', transaction)

Router.use('/*', (req, res, next) => next({ status: 404, message: "API Route not Found" }))

module.exports = Router;