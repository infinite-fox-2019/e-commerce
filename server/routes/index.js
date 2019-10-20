const router = require('express').Router();
const users = require('./user')
const items = require('./item')
const transavtions = require('./transaction')
const images = require("../helpers/image.js")
const authentication = require('../middlewares/authentication')
const {adminAuthz } = require('../middlewares/authorization')

router.use('/users', users)
router.use('/items', items)
router.use('/transactions', transavtions)

router.post("/upload", authentication, adminAuthz, images.multer.single("image"),
images.sendUploadToGCS,
(req, res) => {
    res.send({
        status: 200,
        gcsName: req.body.fileName,
        message: "Your file is successfully uploaded",
        'link': req.file.cloudStoragePublicUrl
    });
})

module.exports = router