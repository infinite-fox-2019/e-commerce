if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
  require('dotenv').config()
}

const mongoose = require('mongoose')
const express = require('express')
const routes = require('./routes')
const morgan = require('morgan')
const cors = require('cors')
const errorhandler = require('./middlewares/errorhandler')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.set('useFindAndModify', false);
// mongoose.connect(`${process.env.MONGO_DB}-${process.env.NODE_ENV}`,{useNewUrlParser : true, useUnifiedTopology : true})
//   .then(()=>{
//     console.log(`Connected to DB ${process.env.NODE_ENV}`)
//   })
//   .catch((err)=>{
//     console.log(err)
//   })

mongoose.connect(process.env.MONGO_ATLAS,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>{
    console.log('connectedOnAtlas')
  })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));

app.use(morgan('dev'))
app.use(cors())
app.use(('/'),routes)

app.use(errorhandler)



app.listen(PORT,()=>{
  console.log(`up and running on ${PORT}`)
})

module.exports = app