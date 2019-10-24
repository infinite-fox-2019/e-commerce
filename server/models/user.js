'use strict'

const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: [true, 'E-mail is already used & registered!'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format!']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Please insert minimum 8 character for the password']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  cart: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number
  }]
}, {
  timestamps: true
})

userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase()
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
