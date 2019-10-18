const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt');

const userSchema = new Schema({
    name: { type: String, required: [true, 'Name cannot be empty'] },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
        required: [true, 'Email address cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty']
    },
    role: { type: String, default: 'user' },
    cart: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        qty: { type: Number, min: 1 }
    }]
}, {
    versionKey: false
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User