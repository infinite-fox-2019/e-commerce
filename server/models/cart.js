const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CartSchema = new Schema({
    customer_id: {
        type: ObjectId,
        required: [true, "CustomerId Is Required"],
        ref: "User"
    },
    product_id: {
        type: ObjectId,
        required: [true, "ProductId Is Required"],
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: [true, "Quantity Must Be Greater Than 0"]
    }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart