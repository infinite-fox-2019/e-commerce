if (process.env.NODE_ENV==='development' || process.env.NODE_ENV==='test') {
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
mongoose
  .connect(`mongodb+srv://mongodbatlas:mongodbatlas@myfirstcluster-6alcw.gcp.mongodb.net/e-commerce-${process.env.NODE_ENV}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((_) => console.log('database mongoose connected'))
  .catch((_) => console.log('cant connect to database'))

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

module.exports = app
