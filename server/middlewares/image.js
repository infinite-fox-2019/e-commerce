'use strict'

const { Storage } = require('@google-cloud/storage')
const GOOGLE_CLOUD_BUCKET = process.env.GOOGLE_CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
})
const bucket = storage.bucket(GOOGLE_CLOUD_BUCKET)
const url = (filename) => {
  return `https://storage.googleapis.com/${GOOGLE_CLOUD_BUCKET}/${filename}`
}
const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }
  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })
  stream.on('error', (err) => {
    console.log('Upload image to Google Cloud Storage error')
    req.file.cloudStorageError = err
    next(err)
  })
  stream.on('finish', () => {
    console.log('Image successfully uploaded to Google Cloud Storage')
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.url = url(gcsname)
      next()
    })
  })
  stream.end(req.file.buffer)
}

const deleteFile = (url) => {
  if (!url.includes('storage.google')) {
    return
  }
  const deleteFile = url
  const filename = deleteFile.replace(/(https:\/\/storage.googleapis.com\/playstation-e-commerce-image\/)/, '')

  storage
    .bucket(GOOGLE_CLOUD_BUCKET)
    .file(filename)
    .delete()
  console.log('File successfully deleted')
}
const Multer = require('multer')
const multer = Multer({
  fileFilter: function (req, file, next) {
    if (!file) { next(null, true) }
    if (file.mimetype === 'image/png' | file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      next(null, true)
    } else {
      next({ status: 400, message: 'Invalid image extension type' })
    }
  },
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10485760
  }
})

module.exports = {
  sendUploadToGCS,
  multer,
  deleteFile
}
