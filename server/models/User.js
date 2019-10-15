const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword} = require('../helpers/bcryptjs')

userSchema = new Schema ({
  username: {
    type: String,
    required: [true, 'Username cannot be empty'],
    unique: true,
    minlength: [6, 'Username have to be at least 6 characters']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: true,
    validate: {
      validator: function(v) {
        re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(v).toLowerCase());
      },
      message: props => `${props.value} is not a valid email format`
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    unique: true,
    validate: {
      validator: function(v) {
        re = /^\w+$/
        return re.test(v) && v.length >= 6;
      },
      message: props => `Password has to be at least 6 characters and contains letter and number`
    }
  },
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