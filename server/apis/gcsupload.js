const gcsUpload = require("gcs-upload")

const upload = gcsUpload({
    limits: {
        fileSize: 10000000
    },
    gcsConfig: {
        keyFilename: 'keyfile.json',
        bucketName: "e-commerce-storage.panji-h8.online"
    }
})

module.exports = upload