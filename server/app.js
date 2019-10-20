if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' )require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./router')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const mongoose = require('mongoose')

// mongoose.connect(`mongodb://localhost/ecommerce${process.env.NODE_ENV}`, { useNewUrlParser: true , useUnifiedTopology: true })
mongoose.connect(process.env.MONGOATLAS, { useNewUrlParser: true , useUnifiedTopology: true } , () => {
    console.log('connected to mongo atlas')
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/', router)
app.use(errorHandler)

app.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))

module.exports = app


