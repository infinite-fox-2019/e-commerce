const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    firstName: String,
    lastName: String,
    province: String,
    zip: Number,
    email: String,
    phone: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, `Empty Cart, Please add Product to cart`]
    }],
    status: {
        type: String,
        required: [true, `status required`]
    },
    address: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

cartSchema.pre('save', function (next) {
    console.log('masuuuk middlewaresssss')
    this.firstName = null
    this.lastName = null
    this.province = null
    this.zip = null
    this.email = null
    this.phone = null
    this.address = null
    next()
})

module.exports = mongoose.model('Cart', cartSchema)