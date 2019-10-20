const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
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
        type: String,
        required: [true, `address must be filled`]
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Cart', cartSchema)