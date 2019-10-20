const products = require('express').Router()
const {add,update,findAll,remove, findOne} = require('../controllers/productController')
const {authentication,authorization} = require('../middlewares/auth')
const uploadGCS = require('../middlewares/upload')



products.get('/',findAll)
products.get('/:_id',findOne)
products.post('/add',authentication,authorization,uploadGCS.multer.single('image'),uploadGCS.sendUploadToGCS,add)
products.patch('/:_id',authentication,authorization,update)
products.delete('/:_id',authentication,authorization,remove)

module.exports = products