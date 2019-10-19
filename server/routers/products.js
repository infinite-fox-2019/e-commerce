const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authentication } = require('../middlewares/auth')
const { adminAuthorization } = require('../middlewares/auth')

router.get('/', ProductController.find)
router.use(authentication)
router.post('/', adminAuthorization, ProductController.add)

module.exports = router