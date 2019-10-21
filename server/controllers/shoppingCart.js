const ShoppingCart = require('../models/shoppingCart')
const Product = require('../models/product')

class shoppingCartController {
    static create(req,res,next){
        ShoppingCart.create({
            items : [],
            owner : req.decode.id
        })
        .then((shoppingCart)=>{
            res.status(201).json({
                shoppingCart
            })
        })
        .catch(next)
    }

    static addItem(req,res,next){
        if (!req.query.item) {
            next({
                name: 'Bad Request',
                customMessage: 'No item to add'
            })
        }
        ShoppingCart.findOne({ owner : req.decode.id })
        .then((shoppingCart) =>{
            if (shoppingCart){
                return Product.findById(req.query.item)
                .then(product=>{
                    if (product) {
                        shoppingCart.items.push(req.query.item)
                        shoppingCart.save()
                        res.status(200).json({
                            shoppingCart
                        })
                    } else {
                        next({
                            name:'NotFound', 
                            customMessage: "Product not found"
                        })
                    }
                })
            } else {
                next({
                    name:'Unauthorized', 
                    customMessage: "Not authorized to access this shopping cart"
                })
            }
        })
        .catch(next)
    }

    static deleteItem(req,res,next){
        if (!req.query.item) {
            next({
                name: 'Bad Request',
                customMessage: 'No item to delete'
            })
        }
        ShoppingCart.findOne({ owner : req.decode.id })
        .then((shoppingCart) =>{
            if (shoppingCart){
                Product.findById(req.query.item)
                .then(product=>{
                    if (product) {
                        let match = 0
                        for( var i = 0; i < shoppingCart.items.length; i++){ 
                            if ( shoppingCart.items[i].toString() === req.query.item) {
                              shoppingCart.items.splice(i, 1);
                              match++
                            }
                         }
                         console.log(match)
                         if (match) {
                            shoppingCart.save()
                         } else {
                            next({
                                name:'NotFound', 
                                customMessage: "Product not found"
                            })
                         }
                         res.status(200).json({
                             shoppingCart   
                         })
                    } else {
                        next({
                            name:'NotFound', 
                            customMessage: "Product not found"
                        })
                    }
                })
            } else {
                next({
                    name:'Unauthorized', 
                    customMessage: "Not authorized to access this shopping cart"
                })
            }
        })
        .catch(next)
    }

    static find(req,res,next){
        ShoppingCart.findOne({ owner : req.decode.id })
        .then((shoppingCart) =>{
            if (shoppingCart){
                res.status(200).json({
                    shoppingCart
                })
            } else {
                next({
                    name: 'Unauthorized', 
                    message: "Not authorized to access this shopping cart"
                })
            }
        })
        .catch(next)
    }

    static delete(req,res,next){
        ShoppingCart.findOneAndDelete({ owner : req.decode.id })
        .then(() =>{
            res.status(200).json({
                message : 'Shopping cart deleted'
            })
        })
        .catch(next)
    }
}

module.exports = shoppingCartController