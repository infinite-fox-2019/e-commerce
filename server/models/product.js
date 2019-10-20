const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product is alredy taken']
    },
    category: [],
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    stock: {
        type: Number,
        required: [true, 'Price is required']
    },
    imgUrl: String
}, {
    versionKey: false
    })

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product