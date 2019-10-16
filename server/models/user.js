const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new Schema({
  name: String,
  role: {
    type: String,
    default: 'costumer'
  },
  email: {
    type: String,
    unique: true
  },
  password: String
}, {versionKey: false})

userSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User