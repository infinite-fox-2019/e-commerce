const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name Is Required']
    },
    description: String,
    stock: {
        type: Number,
        required: [true, 'Stock Must Be Greater Than 0']
    },
    price: {
        type: Number,
        required: [true, "Price Must Be Greater Than 0"]
    },
    file: {
        type: String,
        default: null
    }
})

productSchema.pre('save', function(next) {
    if (!this.description) {
        this.description = "No Description"
    }
    next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product