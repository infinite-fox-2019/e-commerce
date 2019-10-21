const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
   items: 
  [{
        productId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        qty: {
            type: Number,
            require: [true, `quantity is require`],
            min: [1, `minimum quantity is 1`]
        },
   }],
    totalPrice: {
        type: Number,
        require: [true, `price is require`],
        min: [1, `minimum price is 1`]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true })

// HITUNG TOTAL HARGA


module.exports = mongoose.model('Transaction', transactionSchema)