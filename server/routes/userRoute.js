const Route = require("express").Router();
const UserCont = require('../controllers/userController.js');
const {authentication,authorizationAdmin} = require('../middleware/auth');

//==================REGISTER======================//

Route.get('/',authentication,authorizationAdmin,UserCont.findAll);

//==================PUT for Admin======================//

Route.patch('/:id',authentication,authorizationAdmin,UserCont.updateForAdmin);

//==================REGISTER======================//

Route.post('/register',UserCont.register);

//==================LOGIN======================//

Route.post('/login',UserCont.login);

//==================LOGIN======================//

Route.get('/findprofile',authentication,UserCont.findOne);


Route.delete('/:id',authentication,authorizationAdmin,UserCont.delete);

//==================EXPORTS======================//

module.exports = Route;