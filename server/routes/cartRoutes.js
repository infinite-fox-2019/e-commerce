const router = require("express").Router()
const CartController = require("../controllers/cartController")
const {authentication} = require("../middlewares/auth")


router.get("/",authentication, CartController.seeCart)
router.patch("/:id",authentication, CartController.addCart)
router.delete("/:id",authentication, CartController.pullCart)


module.exports = router