const route = require('express').Router();
const userRoute = require('./userRoute');
const produtRoute = require('./productRoute');
const transactionRoute = require('./transactionRoute');

route.use('/users', userRoute)
route.use('/products', produtRoute)
route.use('/transactions', transactionRoute)


module.exports = route