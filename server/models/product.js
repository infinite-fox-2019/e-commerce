const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, `your product needs name`]
    },
    image: {
        type: String,
        required: [true, `your product needs image`]
    },
    price: {
        type: Number,
        required: [true, `your product needs price`]
    },
    stock: {
        type: Number,
        required: [true, `your product needs stock`]
    },
    brand: {
        type: String,
        required: [true, `your product needs brand`]
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Product', productSchema)