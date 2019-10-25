class imageController {
    static imageLink (req, res, next) {
        res.send({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
          })
    }
}

module.exports = imageController