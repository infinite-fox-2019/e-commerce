const Route = require('express').Router();
const productCont = require('../controllers/productController.js');
const {authentication, authorizationAdmin} = require('../middleware/auth')


//=============UPLOAD==================//

const images = require('../helpers/images')


//==================FINDALL======================//

Route.get('/',authentication,authorizationAdmin,productCont.findAll);

//==================FINDName======================//

Route.get('/:name',authentication,productCont.findByName);

//==================FINDName======================//

Route.get('/sc/:id',authentication,productCont.findIdProduct);

//==================CREATE======================//

Route.post('/',authentication,authorizationAdmin,
images.multer.single('image'), 
images.sendUploadToGCS,productCont.create);

//==================UPDATE======================//

  
Route.put('/:id',authentication,authorizationAdmin,productCont.update);

//==================DELETE======================//

Route.delete('/:id',authentication,authorizationAdmin,productCont.delete);



//==================EXPORTS======================//

module.exports = Route;