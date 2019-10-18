const mongoose = require('mongoose');
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    status: { type: String, default: 'pending' }, //order, paid, delivery, confirmed
    price: { type: Number, min: 0 },
    items: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product' }, qty: { type: Number, min: 1 } }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    versionKey: false,
    timestamps: true
})


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;