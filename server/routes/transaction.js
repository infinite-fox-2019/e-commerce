const router = require('express').Router()
const cartController = require('../controllers/transaction')
const { Authentication, Authorization } = require('../middlewares/auth')

router.use(Authentication)
router.get('/unpaid', cartController.unpaid)
router.get('/paid/:id', cartController.paid)
router.get('/done/:id', cartController.done)
router.get('/sending/:id', Authorization, cartController.sending)
router.post('/', cartController.create)

module.exports = router