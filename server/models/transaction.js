const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: Number
}, { _id: false })

const transactionSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'Users' },
    products: [productSchema],
    status: { type: String, default: "pending" }
}, { timestamps: true, versionKey: false })

const Transaction = mongoose.model('Transactions', transactionSchema)

module.exports = Transaction