const router = require('express').Router()
const productController = require('../controllers/product')
const { authorization, authentication } = require("../middlewares/auth")
const gcsUpload = require("gcs-upload")

const upload = gcsUpload({
    gcsConfig: {
      keyFilename: './keyfile.json',
      bucketName: 'shopimages.ricky-works.online'
    }
  })

router.get('/', productController.findAll)
router.get('/:id', productController.findOne)
router.use(authentication, authorization)
router.post('/', productController.create)
router.patch('/:id', productController.update)
router.delete('/:id', productController.delete)

module.exports = router