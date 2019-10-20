const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authentication } = require('../middlewares/auth')
const { adminAuthorization } = require('../middlewares/auth')

router.get('/', ProductController.find)
router.use(authentication)
router.use(adminAuthorization)
router.post('/', ProductController.add)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router