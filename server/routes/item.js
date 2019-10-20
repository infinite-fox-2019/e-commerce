//Artzone 
const router = require('express').Router()
const ItemController = require('../controllers/item')
const authentication = require('../middlewares/authentication')
const {adminAuthz} = require('../middlewares/authorization')

router.get('/', ItemController.getAll)
router.get('/tag/:tag', ItemController.filterTag)
router.get('/:id', ItemController.getOne)

router.post('/', authentication, adminAuthz,ItemController.create)

router.use('/:id', authentication, adminAuthz)
router.patch('/stock', ItemController.setStock)
router.delete('/:id', ItemController.destroy)
router.put('/:id', ItemController.update)

module.exports = router