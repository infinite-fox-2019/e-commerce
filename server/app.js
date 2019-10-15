const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
mongoose
  .connect('mongodb://localhost/e-commerce-'+process.env.NODE_ENV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((_) => console.log('database mongoose connected'))
  .catch((_) => console.log('cant connect to database'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

module.exports = app