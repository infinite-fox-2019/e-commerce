const route = require('express').Router();
const userRoute = require('./userRoute');
const produtRoute = require('./productRoute');

route.use('/users', userRoute)
route.use('/products', produtRoute)


module.exports = route