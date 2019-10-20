const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')
const validate = require('mongoose-validator')

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        validate: [
            validate({
                validator:'isEmail',
                message:'invalid email format'
            })
        ]
    }, 
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String
    },
    address: {
        type: String
    },
    cart: [],
    transaction: []
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    this.role = 'customer'
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User