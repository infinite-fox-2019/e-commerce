if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require ('express')
const mongoose = require ('mongoose')
const errorHandler = require ('./middlewares/errorHandler')
const routeIndex = require('./routes/index')
const cors = require ('cors')
const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const port = process.env.PORT || 3000
app.use(cors())
app.use('/', routeIndex)
app.use(errorHandler)

mongoose.connect('mongodb://localhost:27017/e-commerceDB',{useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    console.log("connection OK")
}).catch((err)=>{
    console.log(err)
});

app.listen(port, function (){
    console.log(`listening on port ${port}`)
})
