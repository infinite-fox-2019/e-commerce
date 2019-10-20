const router = require('express').Router()
const UserController = require('../controllers/user')
const authentication = require('../middlewares/authentication')

router.post('/', UserController.create)
router.post('/login', UserController.login)

router.use('/:route', authentication)
router.get('/account', UserController.getDetail)
router.patch('/add/:idItem', UserController.addCart)
router.patch('/remove/:idItem', UserController.removeCart)
module.exports = router