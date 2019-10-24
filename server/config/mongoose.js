'use strict'

const mongoose = require('mongoose')

const NODE_ENV = process.env.NODE_ENV
let DATABASE_URL = process.env.ATLAS_CONNECT
if (NODE_ENV === 'test') {
  DATABASE_URL = process.env.DATABASE_URL_TEST
}

mongoose.set('useCreateIndex', true)

module.exports = () => {
  mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB database')
    }).catch((err) => {
      console.log(err, 'Could not connected to MongoDB database')
    })
}
