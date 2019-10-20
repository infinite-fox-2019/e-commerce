const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name must be filled`]
    },
    email: {
        type: String,
        required: [true, `Email must be filled`],
        unique: true,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        minlength: [5, `Minimum password length is 5`],
        required: [true, `Password must be filled`]
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    role: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }

}, {
    versionKey: false
})

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    this.transaction = null
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User