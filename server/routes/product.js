const router = require('express').Router()
const productController = require('../controllers/product')
const { authorization, authentication } = require("../middlewares/auth")

router.get('/', productController.findAll)
router.get('/:id', productController.findOne)
router.use(authentication, authorization)
router.post('/', productController.create)
router.patch('/:id', productController.update)
router.delete('/:id', productController.delete)

module.exports = router