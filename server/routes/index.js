const express = require("express")
const router = express.Router()

const userRoutes = require("./userRoutes")
const adminRoutes = require("./adminRoutes")
const cartRoutes = require("./cartRoutes")
const loginRoutes = require("./loginRoutes")
const registerRoutes = require("./registerRoutes")
const uploadRoutes = require("./uploadRoutes")

router.use('/register', registerRoutes)
router.use('/login', loginRoutes)
router.use('/users', userRoutes)
router.use('/admins', adminRoutes)
router.use('/carts', cartRoutes)
router.use('/upload', uploadRoutes)

module.exports = router