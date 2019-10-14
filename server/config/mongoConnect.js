const mongoose = require('mongoose');
const uri = process.env.MONGO_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('connected to the database') })
    .catch(() => {
        console.log('cannot connect to the database');
    })

module.exports = mongoose