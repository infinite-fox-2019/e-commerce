const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const TransSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    dp: String,
    date: String,
    exp: String,
    transactionId : String,
    minus: String
})

TransSchema.pre('save',function(next){
    this.exp = '2 Days'
    next()
})

const Transaction = Mongoose.model('transactions',TransSchema);

Transaction.createCollection()
    .then(_=>{
        console.log('Transaction Collection is now Created!');
    })
    .catch(console.log);

module.exports = Transaction;