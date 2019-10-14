const Route = require("express").Router();
const UserCont = require('../controllers/userController.js');


//==================REGISTER======================//

Route.post('/register',UserCont.register);

//==================LOGIN======================//

Route.post('/login',UserCont.login);


//==================EXPORTS======================//

module.exports = Route;