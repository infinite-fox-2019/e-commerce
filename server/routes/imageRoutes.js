const express = require('express'),
      router = express.Router(),
      images = require('../helpers/images')
  
const isAdmin = require('../middlewares/isAdmin')
const isLogin = require('../middlewares/isLogin')
const imageController = require('../controllers/imageController')

/* GET main endpoint. */
router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS, isLogin, isAdmin, imageController.imageLink)

module.exports = router