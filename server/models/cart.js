const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const CartSchema = new Schema({
    UserId = {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    ProductId = [
        {
            type: Schema.Types.ObjectId,
            ref: 'products'
        }
    ],
    status : Boolean
})

CartSchema.pre('save',function(next){
    this.status = false;
})

const Cart = Mongoose.model('carts',CartSchema);

Cart.createCollection()
    .then(_=>{
        console.log('Cart Collection is now Created!');
    })
    .catch(console.log);

module.exports = Cart;