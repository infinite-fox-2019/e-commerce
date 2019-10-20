const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const { authorization } = require('../middlewares/auth')
const Controller = require('../controllers/product')
const upload = require('../middlewares/gcsupload')
const multer = require('../helpers/multer')

router.get('/:id', Controller.findOne)
router.post('/' , authentication , authorization , multer.multer.single('image'), multer.sendUploadToGCS , Controller.create)
router.get('/', Controller.findAll)
router.delete('/:id', authentication , authorization , Controller.delete)
router.patch('/:id', authentication , authorization , multer.multer.single('image'), multer.sendUploadToGCS, Controller.patch)

module.exports = router