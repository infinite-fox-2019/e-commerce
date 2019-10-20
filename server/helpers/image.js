require('dotenv').config()

const { Storage } = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  // console.log(filename, '<<<<<<<<<<<');
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}
const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }
  // console.log(req.file, '<<<<<<<<<');
  const gcsname = Date.now() + req.file.originalname
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
      console.log('here');
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      console.log(req.file.cloudStoragePublicUrl);
      req.body.fileName = gcsname
      req.body.featured_image = getPublicUrl(gcsname)
      next()
    })
  })
  stream.end(req.file.buffer)
}

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
      console.log('here?');
      if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ) {
        cb(null, true);
        
      }
      else{
        // console.log('here');
        req.fileValidationError = 'goes wrong on the mimetype';
        return cb(null, false, new Error('goes wrong on the mimetype'));
      }
    }
  })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}