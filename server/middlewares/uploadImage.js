const express = require('express')
const gcsUpload = require('gcs-upload')
 
const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: '../keyfile.json',
    bucketName: 'e-commerce-featured-images'
  }
})
 
function uploadImage (req,res,next){
  console.log('reached')
    upload.single('file')
    console.log('here')
    next()
}

module.exports = uploadImage

/* const gcsUpload = require('gcs-upload')
 
// .......
 
const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: 'keyfile.json',
    bucketName: 'e-commerce-featured-images'
  }
})
 
router.post('/upload-single', upload.single('file'), (req, res) => {
    console.log('reg')
  console.log(req.body.file)
  res.end()
}) */