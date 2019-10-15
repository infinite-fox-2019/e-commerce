const Router = require('express').Router(),
    ProductController = require('../controllers/product'),
    authentication = require('../middlewares/authentication'),
    { admin } = require('../middlewares/authorization'),
    multer = require('../middlewares/multer'),
    gcs = require('../middlewares/googleCloudStorage')

Router.use(authentication, admin)
Router.post('/', multer, gcs, ProductController.create)
Router.get('/', ProductController.read)
Router.put('/:id', multer, gcs, ProductController.update)
Router.delete('/:id', ProductController.delete)

module.exports = Router;
