const mongoose = require('mongoose')
const Schema = mongoose.Schema
const{generateHash} = require('../helpers/bcrypt')

const userSchema = new Schema({
  name : {
    type:String, 
    required: "Name is required"},
  email : {
    type:String, 
    required: "Email is required", 
    unique: "Your email has been registred",
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password : {
    type :  String,
    required : "Password required"
  },
  role:{
    type: String,
    default: "user"
  }
})

userSchema.pre("save", function(next){
  console.log(this.password, "passhere")
  let hash = generateHash(this.password)
  this.password = hash
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User