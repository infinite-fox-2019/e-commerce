const Cart = require("../models/cart")

class CartController{

    static seeCart(req,res,next){
        Cart.findOne({UserId : req.loggedUser.id}).populate('ProductsId')
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }

    static addCart(req,res,next){
        let ProductId = req.params.id
        // console.log(ProductId)
        Cart.findOne({UserId : req.loggedUser.id})
        .then(function(data){
            if(data.ProductsId.includes(req.params.id)){
                next({
                    status : 400,
                    message : "Already in Cart"
                })
            }else{
                return Cart.findOneAndUpdate({UserId : req.loggedUser.id}, {$push : {ProductsId : ProductId}}, {new : true})
            }
        })
        .then(function(data){
            if(data){
                res.status(200).json(data)
            }
        })
        .catch(next)
    }


    static pullCart(req,res,next){
        let ProductId = req.params.id
        Cart.findOne({UserId : req.loggedUser.id})
        .then(function(data){
            if(!data.ProductsId.includes(req.params.id)){
                next({
                    status : 404,
                    message : "no item found"
                })
            }else{
                return Cart.findOneAndUpdate({UserId : req.loggedUser.id}, {$pull : {ProductsId : ProductId}}, {new : true})
            }
        })
        .then(function(data){
            if(data){
                res.status(200).json(data)
            }
        })
        .catch(next)
    }
}

module.exports = CartController