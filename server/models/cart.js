const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CartSchema = new Schema({
    UserId  : { type: Schema.Types.ObjectId, ref: 'User' },
    ProductsId : [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    price : {type : Number, default : 0},
    quantity : {type :Number, default : 0}
}, { versionKey: false })

const Cart = mongoose.model('Cart', CartSchema)




module.exports = Cart