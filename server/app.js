if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

mongoose.connect(process.env.MONGOOSE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(_=>{
    console.log('db connected');
  })
  .catch(err=>{
    console.log(err);
  })

app.use(routes)

app.listen(port, ()=>{
  console.log('listen on port ' + port);
})