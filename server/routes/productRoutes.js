const router = require('express').Router()
const productController = require('../controllers/productController')
// const images = require('../helpers/images')
const isAdmin = require('../middlewares/isAdmin')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, isAdmin, productController.create)
router.get('/', productController.displayAll)
router.get('/:id', productController.displayForCategory)
router.get('/search/:keyword', productController.searchProduct)
router.put('/', productController.update)
router.delete('/:id', isLogin, isAdmin, productController.delete)

module.exports = router