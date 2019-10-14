if (process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}

const mongoose = require('mongoose')
const express = require('express')
const routes = require('./routes')
const morgan = require('morgan')
const cors = require('cors')
const errorhandler = require('./middlewares/errorhandler')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.connect('mongodb://localhost:27017/e-commerce',{useNewUrlParser : true, useUnifiedTopology : true})

app.use(morgan('dev'))
app.use(cors())
app.use(('/'),routes)

app.use(errorhandler)



app.listen(PORT,()=>{
  console.log(`up and running on ${PORT}`)
})

module.exports = app