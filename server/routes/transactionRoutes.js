const router = require('express').Router()
const transactionController = require('../controllers/transactionController')

router.get('/:id', transactionController.display)
router.post('/', transactionController.create)
router.patch('/', transactionController.update)

module.exports = router