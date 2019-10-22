const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication } = require('../middleware/auth')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/cart', authentication, UserController.addCart)
router.get('/cart',  authentication, UserController.getCart)
router.delete('/cart/:id',  authentication, UserController.deleteCart)

module.exports = router