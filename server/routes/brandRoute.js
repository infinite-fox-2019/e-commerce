const Route = require('express').Router();
const BrandCont = require('../controllers/brandController.js');


//==================FINDALL======================//

Route.get('/',BrandCont.findAll);

//==================CREATE======================//

Route.post('/',BrandCont.create);

module.exports = Route;