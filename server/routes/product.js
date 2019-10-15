const Router = require('express').Router(),
    ProductController = require('../controllers/product'),
    authentication = require('../middlewares/authentication'),
    { admin } = require('../middlewares/authorization'),
    multer = require('../middlewares/multer'),
    gcs = require('../middlewares/googleCloudStorage')

Router.use(authentication)
Router.use(admin)
Router.post('/', multer.single('image'), gcs, ProductController.create)
Router.get('/', ProductController.read)
Router.put('/:id', multer.single('image'), gcs, ProductController.update)
Router.delete('/:id', ProductController.delete)

module.exports = Router;
