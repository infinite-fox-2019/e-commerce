const express = require('express')
const ShoppingCartController = require('../controllers/shoppingCart')
const authentication = require('../middlewares/authentication')
const router = express.Router()
router.use(authentication)

//get shoping cart of the user with specific ID
router.get('/', ShoppingCartController.find)
router.post('/', ShoppingCartController.create)
router.patch('/addItem', ShoppingCartController.addItem)
router.patch('/deleteItem', ShoppingCartController.deleteItem)
router.delete('/', ShoppingCartController.delete)

module.exports = router