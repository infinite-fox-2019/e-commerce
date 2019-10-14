const router = require('express').Router()
const transactionController = require('../controllers/transaction')

router.post("/:product_id", transactionController.create)
router.delete("/:product_id", transactionController.delete)

module.exports = router