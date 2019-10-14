const router = require('express').Router()
const cartController = require('../controllers/cart')
const { authentication, authorization } = require("../middlewares/auth")

router.use(authentication, authorization)
router.post("/:product_id", cartController.create)
router.patch("/:product_id", cartController.update)
router.delete("/:product_id", cartController.delete)

module.exports = router