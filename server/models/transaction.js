const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Transaction = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            qty: {
                type: Number
            }
        }
    ],
    status: {
        type: String,
        default: 'checkout'
    }
})

const Model = mongoose.model('transaction', Transaction)
module.exports = Model