const router = require('express').Router()
const UserController = require("../controllers/user")
const { authentication, authorization } = require("../middlewares/auth")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.use(authentication, authorization)
router.post("/addItem", UserController.addItem)
router.patch("/updateItem", UserController.updateItem)
router.delete("/removeItem", UserController.removeItem)

module.exports = router