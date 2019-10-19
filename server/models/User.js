const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword} = require('../helpers/bcryptjs')

const isValidUsername = [
  function(v) {
    re = /^[a-zA-Z0-9_]*$/
    return re.test(v);
  },
  'Username can only contains alphanumeric'
]
const isEmail = [
  function(v) {
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(v).toLowerCase());
  },
  '{VALUE} is not a valid email format'
]
const isValidPassword = [
  function(v) {
    re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
    return re.test(v);
  },
  'Password must contain at least 1 letter and 1 number'
]

userSchema = new Schema ({
  username: {
    type: String,
    required: [true, 'Username cannot be empty'],
    unique: true,
    minlength: [6, 'Username have to be at least 6 characters'],
    validate: isValidUsername
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: true,
    validate: isEmail
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    unique: true,
    minlength: [6, 'Password have to be at least 6 characters'],
    validate: isValidPassword
  },
  role: {
    type: String,
    default: 'customer'
  }
}, {
  versionKey: false
})

userSchema.pre('save', function(next) {
  try {
    this.password = hashPassword(this.password)
    next()
  } catch(err) {
    next(err)
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User