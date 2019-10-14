const mongoose = require('mongoose')
const { hash } = require('../helpers/bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username Required'],
        validate: {
            validator: function (username) {
                return new Promise((resolve, reject) => {
                    User.findOne({ username }).then(result => result ? resolve(false) : resolve(true))
                });
            },
            message: "Username is already taken"
        }
    },
    email: {
        type: String,
        required: [true, 'Email Required'],
        match: [/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email Format'],
        validate: {
            validator: function (email) {
                return new Promise((resolve, reject) => {
                    User.findOne({ email }).then(result => result ? resolve(false) : resolve(true))
                });
            },
            message: "Email is already taken"
        }
    },
    role: { type: String, default: "customer" },
    password: {
        type: String,
        required: [true, 'Password Required'],
    },
    cart: [{
        product: { type: Schema.Types.ObjectId, ref: 'Products' },
        quantity: Number
    }]
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User