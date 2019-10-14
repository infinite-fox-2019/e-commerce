const Route = require('express').Router();
const User = require('./userRoute');
const Product = require('./productRoute');
const Brand = require('./brandRoute');

//==================USER======================//

Route.use('/',User);

//==================PRODUCT======================//

Route.use('/products',Product);

//==================BRAND======================//

Route.use('/brands',Brand);




//==================EXPORTS======================//
module.exports = Route;