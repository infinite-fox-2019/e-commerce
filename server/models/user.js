const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')


const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        validate: {
            validator(username) {
                return new Promise((resolve, reject) => {
                    User.findOne({ username }).then(result => result ? resolve(false) : resolve(true))
                });
            },
            message: "Username is already taken"
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        match: [/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email format."],
        validate: {
            validator(email) {
                return new Promise((resolve, reject) => {
                    User.findOne({ email }).then(result => result ? resolve(false) : resolve(true))
                });
            },
            message: "Email is already taken"
        }
    },
    password: {
        type: String,
        required: [true, 'password is required!']
    },
    role: { type: String, default: 'customer' }
    
}, {
    versionKey: false
})

UserSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User