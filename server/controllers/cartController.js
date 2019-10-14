const Cart = require('../models/cart');


class CartController {
    static findSpesific(req,res,next){
        Cart.find({
            UserId : req.loggedUser._id
        })
            .then(cust=>{
                res.status(200).json(cust);
            })
            .catch(err=>{
                next(err);
            })
    }
    static createCart(req,res,next){
        const UserId = req.loggedUser._id;
        const {qty} = req.body;
        const ProductId = req.body.productId;
        Cart.create({
            UserId,
            qty,
            $push:{
                ProductId
            }
        })
            .then(_=>{
                //expetasi
                res.status(201).json({msg:'success create Cart'});
            })
            .catch(err=>{
                next(err);
            })
    }
}


module.exports = CartController;