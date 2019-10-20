const router = require("express").Router()
const UserController = require("../controllers/userController")
const {authentication} = require("../middlewares/auth")


router.get("/",authentication, UserController.seeAllProduct)
router.post("/", authentication, UserController.createCart)
router.delete("/", authentication, UserController.removeCart)


module.exports = router