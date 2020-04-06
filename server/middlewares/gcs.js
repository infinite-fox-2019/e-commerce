const gcs = require('gcs-upload');

const upload = gcs({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: process.env.KEY_FILEPATH,
        bucketName: process.env.BUCKET_NAME
    }
})

module.exports = upload