const router = require('express').Router()
const superuserController = require('../controllers/superuser')
const { authentication, authorization } = require("../middlewares/auth")

router.use(authentication, authorization)
router.post("/", superuserController.register)
router.delete("/:id", superuserController.delete)

module.exports = router