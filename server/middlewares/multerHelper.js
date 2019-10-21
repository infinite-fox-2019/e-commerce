'use strict'
require('dotenv').config()

const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCS_KEYFILE
})
const bucket = storage.bucket('ecommerce-picture')

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${'ecommerce-picture'}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {

  if (!req.file) {
    return next()
  }

  const gcsname = Date.now() + req.file.originalname.split(' ').join('')
  const file = bucket.file(gcsname)

  
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const Multer = require('multer'), // jangan disini karna ini manifest
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}