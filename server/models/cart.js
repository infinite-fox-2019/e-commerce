const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const cartSchema = new Schema({
    customer_id: {
        type: ObjectId,
        ref: "User",
        required: [true, "CustomerId Is Required"]
    },
    product_id: {
        type: ObjectId,
        ref: "Product",
        required: [true, "ProductId Is Required"]
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity Must Be Greater Than 0']
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart