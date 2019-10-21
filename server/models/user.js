const mongoose = require ('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
var validate = require('mongoose-validator');
const Schema = mongoose.Schema
const { hashPassword } = require ('../helpers/bcrypt')

const usernameValidator = [
    validate({
      validator: 'isLength',
      arguments: [4, 20],
      message: 'Username should be between 4 and 20 characters',
    })
  ]

const emailValidator = [
    validate({
      validator: 'isEmail',
      message: 'Email needs to be valid',
    })
  ]

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: [true,'username taken'],
        validate: usernameValidator
    },
    email : {
        type : String,
        required : true,
        unique: [true,'email taken'],
        validate: emailValidator
    },
    password : {
        type : String,
        required : true
    }
}) 

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(){
    this.password = hashPassword(this.password)
})


const User = mongoose.model('User', userSchema)

module.exports = User