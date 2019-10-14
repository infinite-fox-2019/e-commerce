if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config();

}


const express = require('express');
const mongoConnect = require('./config/mongoConnect');
const errorHandler = require('./middlewares/errorHandler');
const port = process.env.PORT || 3000
const route = require('./routes');

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', route)

app.use(errorHandler)

// app.listen(port, () => { console.log(`this app run on port ${port}`) })

module.exports = app