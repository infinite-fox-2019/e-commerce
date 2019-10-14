// DOTENV VARIABLE
if (process.env.NODE_ENV === 'test') {
    require('dotenv').config()
}

// STATE VARIABLES
const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')
const app = express()

//CONNECTION
mongoose.connect(process.env.MONGOOSE_URL+`/e-commerce-${process.env.NODE_ENV}`,
        { useNewUrlParser: true,
        useUnifiedTopology: true },
        (err => {
            err ? console.log(err) : console.log('connected to mongoose')
        }))

// MIDDLE WARES
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//ROUTE
app.use('/', routes)


//ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

module.exports = app