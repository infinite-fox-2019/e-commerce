const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword} = require('../helpers/bcryptjs')

userSchema = new Schema ({
  username: {
    type: String,
    required: [true, 'Username cannot be empty'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    unique: true
  },
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