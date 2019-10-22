const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    AdminId : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    name : {
        type : String,
        required : [true, 'product required name']
    },
    qty : {
        type : Number,
        default : 1,
        min: [0, 'Item already purchased by other customer']
    },
    description : {
        type : String,
        required : [true, 'product required description']
    },
    image : {
        type : String,
        default : 'https://discountseries.com/wp-content/uploads/2017/09/default.jpg'
    },
    category : [{
        type : String,
        required : [true, 'product required category']
    }],
    price : {
        type : Number,
        required : [true, 'product required price']
    }
})

Product.pre('updateOne' ,(next) => {
    next()
    // if(this.qty === 0){
    //     next({name: 'updateError'})
    // }
})

const Model = mongoose.model('product', Product)
module.exports = Model