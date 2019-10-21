const router = require('express').Router()
const TransactionController = require('../controllers/TransactionController')
const { authentication, authorizationTrasaction, authorizationAdmin } = require('../middleware/auth')

router.post('/', authentication, TransactionController.checkout)
router.get('/', authentication, TransactionController.find)
router.get('/admin', authentication, authorizationAdmin, TransactionController.findAdmin)
router.get('/pending', authentication, TransactionController.findPedingTrasactions)
router.get('/:id', authentication ,authorizationTrasaction, authentication, TransactionController.findById)
router.patch('/:id', authentication ,authorizationAdmin, authentication, TransactionController.changeStatus)

module.exports = router