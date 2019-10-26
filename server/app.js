// DOTENV VARIABLE
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

// STATE VARIABLES
const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT

//CONNECTION
mongoose.connect(process.env.MONGOOSE_URL,
        { useNewUrlParser: true,
        useUnifiedTopology: true },
        (err => {
            err ? console.log(err) : console.log('connected to mongoose')
        }))

// MIDDLE WARES
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
//ROUTE
app.use('/', routes)


//ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening at port ${PORT}`))

module.exports = app