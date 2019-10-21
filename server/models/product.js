const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name : {
        type : String,
        required : [true, 'product name is required']
    },
    description : {
        type : String,
        required : [true, 'describe your product!']
    },
    price : {
        type : Number,
        required : [true, 'your potential buyers would want to know how much is the price']
    },
    stock : {
        type : Number,
        required : [true, 'do stocktake!']
    },
    platform : {
        type : String,
        required : [true, 'What machine the game runs on?']
    },
    deal : {
        type : Boolean,
        required : [true, 'Is it discounted?']
    },
    featuredImage : {
        type : String
    }
}) 

const Product = mongoose.model('Product', productSchema)

module.exports = Product