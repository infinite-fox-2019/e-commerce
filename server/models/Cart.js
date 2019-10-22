const mongoose = require('mongoose')
const Product = require('./Product')
let Schema = mongoose.Schema

let cartSchema = new Schema({
    userId: {type:  Schema.Types.ObjectId,ref:'users'},
    productId: {type:  Schema.Types.ObjectId,ref:'products'},
    qty: {type: Number, required: [true, 'Cannot be empty'], min:[1,'minimal order is one']},
},{versionKey:false})

cartSchema.pre('save',function(next){
    Product.findById({_id:this.productId})
    .then(product =>{
        if(this.qty > product.stock) {
            throw {statusCode:400, msg:'Product stock is below your request'}
        } else {
            next()
        }
    })
    .catch(next)
})

let Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart
