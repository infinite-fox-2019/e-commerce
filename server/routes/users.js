const users = require('express').Router()
const {add,findAll,update,login,remove} = require('../controllers/userController')

users.get('/',findAll)
users.post('/add',add)
users.patch('/:_id',update)
users.post('/login',login)
users.delete('/:_id',remove)


module.exports = users