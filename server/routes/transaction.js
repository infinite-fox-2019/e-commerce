const router = require('express').Router()
const transactionController = require('../controllers/transaction')
const { authentication, authorization } = require("../middlewares/auth")

router.use(authentication, authorization)
router.post("/:product_id", transactionController.create)
router.delete("/:product_id", transactionController.delete)

module.exports = router