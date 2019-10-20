const router = require("express").Router()
const UserController = require("../controllers/userController")
const {authentication, authorization} = require("../middlewares/auth")


router.get("/",authentication, authorization, UserController.seeSelfProduct)
router.post("/",authentication, authorization, UserController.addProduct)
router.patch("/:id",authentication, authorization, UserController.updateProduct)
router.delete("/:id",authentication, authorization, UserController.deleteProduct)


module.exports = router