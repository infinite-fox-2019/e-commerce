const mongoose = require('mongoose');
let uri = process.env.MONGO_URI

if(process.env.NODE_ENV === 'test'){
    uri = 'mongodb://localhost:27017/test'
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('connected to the database') })
    .catch(() => {
        console.log('cannot connect to the database');
    })

module.exports = mongoose