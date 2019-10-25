const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cartSchema = new Schema({
    user: {
        type: String
    },
    product: [{
        type: String,
        ref: 'Product'
    }]
})

let Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart