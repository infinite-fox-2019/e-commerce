const router = require('express').Router()
const CartController = require('../controllers/cart')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.get("/", CartController.findAll)
router.post("/", CartController.create)
router.patch("/:product_id", CartController.update)
router.delete("/:product_id", CartController.delete)

module.exports = router