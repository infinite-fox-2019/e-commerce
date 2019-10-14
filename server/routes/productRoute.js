const Route = require('express').Router();
const productCont = require('../controllers/productController.js');
const {authentication, authorizationAdmin} = require('../middleware/auth')


//=============UPLOAD==================//

const images = require('../helpers/images')


//==================FINDALL======================//

Route.get('/',productCont.findAll);

//==================CREATE======================//

Route.post('/',authentication,authorizationAdmin,images.multer.single('image'), 
images.sendUploadToGCS,productCont.create);

//==================UPDATE======================//

Route.put('/:id',authentication,authorizationAdmin,productCont.update);

//==================DELETE======================//

Route.delete('/:id',authentication,authorizationAdmin,productCont.delete);



//==================EXPORTS======================//

module.exports = Route;