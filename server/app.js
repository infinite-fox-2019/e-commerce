if(process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"){
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('tiny'))
app.use(cors())

let url = `${process.env.MONGODB}-${process.env.NODE_ENV}`

mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true})
.then(console.log("Database connected"))
.catch(console.log)

app.listen(port, () => {
  console.log("App listen on port " + port)
})

app.use(errorHandler)
module.exports = app