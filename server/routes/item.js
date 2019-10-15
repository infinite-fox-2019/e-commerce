const router = require('express').Router()
const ItemController = require('../controllers/item')

router.post('/', ItemController.create)
// router.get('/', ItemController.getItems)
router.delete('/:id', ItemController.destroy)

module.exports = router