const router = require('express').Router()
const TransactionController = require('../controllers/transaction')
const authentication = require('../middlewares/authentication')
const {transAuthz, adminAuthz} = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TransactionController.create)
router.post('/income', adminAuthz, TransactionController.find)
// router.get('/', adminAuthz, TransactionController.getAll)

router.use('/:route/:id', transAuthz)
router.patch('/cancel/:id', TransactionController.cancelation)
router.patch('/delivery/:id', TransactionController.deliveryStatus )
module.exports = router