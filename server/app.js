
// if(process.env.NODE_ENV==="development"){
//     require("dotenv").config()
// }

require("dotenv").config()

User = require("./models/user")
const express = require("express")
const morgan = require("morgan")
const routes = require("./routes")
const mongoose = require("mongoose")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(cors())
app.use(morgan("dev"))


app.use("/", routes)

// app.post("/register", function(req,res,next){
//     const{email, password} = req.body
//     User.create({email,password})
//     .then((data)=>{
//         res.status(201).json(data)
//     })
//     .catch(next)
// })

mongoose.connect(process.env.URL_MONGOOSE, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify:false})

app.use(errorHandler)

app.listen(PORT, _ =>{
    console.log("listening on PORT", PORT)
})


module.exports = app