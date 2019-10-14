const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    require('dotenv').config()
}

const express = require('express'),
    app = express(),
    cors = require('cors'),
    mongoose = require('mongoose'),
    db = NODE_ENV ? 'mongodb://localhost:27017/SmartHome-' + NODE_ENV : process.env.MONGO_DB,
    port = process.env.PORT,
    routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log(`Connected to MongoDB ${NODE_ENV ? "Local" : "Atlas"}`)
        console.log(db)
    }).catch((err) => {
        console.log(err)
        console.log('============ FAILED TO CONNECT TO MONGODB ============');
    });


app.use('/', routes)

app.connect(port, () => console.log("Connected on port " + port))

module.exports = app