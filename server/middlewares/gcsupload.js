const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6
    },
    gcsConfig: {
        keyFilename: '/home/aldino/Documents/hacktiv8/phase2/e-commerce/server/keyGcs.json',
        bucketName: 'solution.aldinofrizal.xyz'
    }
})

module.exports = upload