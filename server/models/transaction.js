const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Transaction', transactionSchema)