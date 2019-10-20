const Route = require('express').Router();
const User = require('./userRoute');
const Product = require('./productRoute');
const Brand = require('./brandRoute');
const Transactions = require('./TransRoute');

//==================USER======================//

Route.use('/',User);

//==================PRODUCT======================//

Route.use('/products',Product);

//==================BRAND======================//

Route.use('/brands',Brand);

Route.use('/transactions',Transactions);


//==================EXPORTS======================//
module.exports = Route;