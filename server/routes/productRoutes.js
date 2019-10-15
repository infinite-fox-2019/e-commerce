const router = require('express').Router()
const ProductController = require('../controllers/product')

router.post('/add', ProductController.add)
router.get('/', ProductController.find)
router.delete('/:id', ProductController.remove)

module.exports = router