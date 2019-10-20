const router = require('express').Router()
const Controller = require('../controllers/transaction')
const { authentication , authorization } = require('../middlewares/auth')

router.get('/' , authentication , Controller.findAll)
router.get('/user' , authentication, Controller.findByUser)
router.patch('/:id', authentication, authorization , Controller.confirm)

module.exports = router