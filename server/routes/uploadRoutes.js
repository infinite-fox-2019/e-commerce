const router = require('express').Router()
const UploadController = require("../controllers/uploadController")
const images = require("../middlewares/images")


router.post("/", images.multer.single('image'), 
images.sendUploadToGCS, UploadController.upload)

module.exports = router

