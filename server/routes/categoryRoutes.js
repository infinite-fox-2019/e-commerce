const router = require('express').Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.displayAll)
router.post('/', categoryController.create)

module.exports = router