const mongoose = require('mongoose')

let Schema = mongoose.Schema

let cartSchema = new Schema({
    userId: {type:  Schema.Types.ObjectId,ref:'users'},
    productId: {type:  Schema.Types.ObjectId,ref:'products'},
},{versionKey:false})

let Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart
