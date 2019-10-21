const ProductController = require ('../controllers/product')
const authentication = require ('../middlewares/authentication')
const authorization = require ('../middlewares/authorization')
const gcsUpload = require('gcs-upload')
const express = require ('express')
const router = express.Router()
router.use(authentication)

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'keyfile.json',
      bucketName: 'e-commerce-featured-images'
    }
})

router.get('/',ProductController.read)

router.use(authorization)
router.post('/', upload.single('file'), ProductController.create)
router.patch('/:id',ProductController.patch)
router.delete('/:id',ProductController.delete)



module.exports = router