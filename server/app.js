if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes')
const errHandler = require('./middlewares/errHandler')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3000
const database = 'mongodb://localhost:27017/e_commerce'
const dbatlas = process.env.ATLAS

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


mongoose.connect(dbatlas, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}, function (err) {
    if (err) {
        console.log(err)
        console.log(`server isn't connect to mongodb`);
    }
    else {
        console.log('Connected!');
    }
})

app.use('/', index)
app.use(errHandler)

app.listen(PORT, function () {
    console.log(`Helloo ${PORT}`);
})

module.exports = app