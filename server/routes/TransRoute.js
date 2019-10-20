const Route = require('express').Router();
const transCont = require('../controllers/transController.js');
const {authentication,authorizationAdmin,authroizationUser} = require('../middleware/auth'); 

Route.get('/',authentication,authroizationUser,transCont.findSpesific);
Route.get('/admin',authentication,authorizationAdmin,transCont.findForAdmin);
Route.post('/',authentication,transCont.createTrans);
Route.delete('/:id',authentication,authorizationAdmin,transCont.delete);

module.exports = Route;