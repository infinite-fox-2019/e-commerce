const Multer = require('multer');
module.exports = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 2 * 1024 * 1024 // no larger than 2mb
    }
});

