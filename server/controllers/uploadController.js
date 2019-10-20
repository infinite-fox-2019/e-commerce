class UploadController{
    static upload(req, res){
        res.send({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
          })
    }
}

module.exports = UploadController