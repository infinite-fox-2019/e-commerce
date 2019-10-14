if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, (req, res) => {
  console.log(`app listening on port ${PORT}`)
})

module.exports = app