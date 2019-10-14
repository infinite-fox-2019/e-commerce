'use strict'

const router = require('express').Router()
const { ProductController } = require('../controllers')
const { authentication } = require('../middlewares/authentication')
const { admin } = require('../middlewares/authorization')
const { multer, sendUploadToGCS } = require('../middlewares/image')

router.get('/', ProductController.findAll)
router.use(authentication)
router.post('/', admin, multer.single('file'), sendUploadToGCS, ProductController.create)
router.get('/:id', ProductController.findOne)
router.patch('/:id', multer.single('file'), sendUploadToGCS, admin, ProductController.edit)
router.delete('/:id', admin, ProductController.remove)

module.exports = router
