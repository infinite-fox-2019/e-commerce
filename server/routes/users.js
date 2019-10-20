const users = require('express').Router()
const {add,findAll,update,login,remove,addToCart,updCart,checkout,findOne,transaction} = require('../controllers/userController')
const auth = require('../middlewares/auth').authentication
const autz = require('../middlewares/auth').authorization


users.get('/',findAll)
users.get('/transactions',auth,autz,transaction)
users.get('/:_id',findOne)
users.post('/add',add)
users.patch('/:_id/addcart',auth,addToCart)
users.patch('/:_id/updcart',auth,updCart)
users.patch('/:_id/checkout',auth,checkout)
users.patch('/:_id',update)
users.post('/login',login)
users.delete('/:_id',remove)

module.exports = users