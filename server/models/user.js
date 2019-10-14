const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const validate = require('mongoose-validator')
const { hashPassword } = require('../helpers/bcrypt')

const emailValidator = [
    validate({
        validator: 'isEmail'
    })
]

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username Is Required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email Is Required'],
        unique: true,
        validate: emailValidator
    },
    password: {
        type: String,
        required: [true, 'Password Is Required']
    },
    role: String
})

userSchema.pre('save', function(next) {
    if (!this.role) {
        this.role = 'customer'
    }
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User