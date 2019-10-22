const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        default: `Seller didn't provide description`
    },
    image: {
        type: String,
        required: [true, `Image is required`]
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [1, `price can't be under 0`]
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })


module.exports = mongoose.model('Product', productSchema)