const UserController = require('../controllers/user')
const express = require ('express')
const router = express.Router()

router.get('/',UserController.read)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.patch('/:id', UserController.patch)
router.delete('/:id', UserController.delete)

module.exports = router