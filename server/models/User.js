const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users = new Schema({
  username : {
    type : String,
    required : [true,'username is required']
  },
  email : {
    type : String,
    required : [true,'email is required'],
    match : [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,'Email format is invalid']
  },
  password : {
    type : String,
    required : [true,'password is required']
  },
  admin : {
    type : Boolean,
    default : false
  },
  cart : [{
    productId : {type : Schema.Types.ObjectId, ref : 'Product'},
    qty : {type : Number}
  }]
},{
  versionKey : false
})


const User = mongoose.model('User',users)
module.exports = User