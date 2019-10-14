const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const transactionSchema = new Schema({
    customer_id: {
        type: ObjectId,
        ref: "User",
        required: [true, "CustomerId Is Required"]
    },
    product_id: {
        tpye: ObjectId,
        ref: "Product",
        required: [true, "ProductId Is Required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity Must Be Greater Than 0"]
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction