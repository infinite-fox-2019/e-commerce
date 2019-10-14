const Route = require('express').Router();
const cartCont = require('../controllers/cartController.js');
const {authentication} = require('../middleware/auth'); 

Route.get('/',authentication,cartCont.findSpesific);
Route.post('/',authentication,cartCont.createCart);

module.exports = Route;