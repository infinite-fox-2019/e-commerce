const gcsUpload = require('./gcs-upload')
const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: process.env.KEYFILE_PATH,
    bucketName: process.env.BUCKET_NAME
  }
})

module.exports = upload