// if(process.env.NODE_ENV === 'test') {
  require('dotenv').config()
// }

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT
const routers = require('./routers')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

console.log(process.env.MONGOOSE_URI)
mongoose.connect(process.env.MONGOOSE_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(_ => {
  console.log(`database connected`)
})
.catch(err => {
  console.log(err, `database connection failed`)
})

app.use(routers)

app.listen(PORT, (req, res) => {
  console.log(`app listening on port ${PORT}`)
})

app.use(errorHandler)

module.exports = app