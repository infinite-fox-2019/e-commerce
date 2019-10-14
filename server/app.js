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
    routes = require('./routes'),
    errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        if (NODE_ENV !== "test") {
            console.log(`Connected to MongoDB ${NODE_ENV ? "Local" : "Atlas"}`)
            console.log(db)
        }
    }).catch((err) => {
        console.log(err)
        console.log('============ FAILED TO CONNECT TO MONGODB ============');
    });


app.use('/', routes)

app.use(errorHandler)

app.listen(port, () => console.log("Connected on port " + port))

module.exports = app