const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: { type: String, required: [true, 'Product name cannot be empty'] },
    description: String,
    price: {
        type: Number,
        required: [true, 'Price cannot be empty']
    },
    stock: {
        type: Number,
        required: [true, 'Stock cannot be empty']
    },
    image: String,
    category: String
}, {
    versionKey: false
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product