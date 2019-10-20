User = require("../models/user")
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")
// const {OAuth2Client} = require('google-auth-library')
const Product = require("../models/product")
const Cart = require("../models/cart")

class UserController {
    static register(req,res,next){
        const{email, password} = req.body
        User.create({email,password})
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch(next)

    }

    static login(req,res,next){
        const {email, password} = req.body
        User.findOne({email})
        .then(function(data){
            if(data && comparePassword(password,data.password)){
                let payload = {id: data._id, role : data.role, email : data.email}
                // console.log(payload)
                let token = generateToken(payload)
                // console.log({token})
                res.status(200).json({token})
            }else{
                console.log("masuk err login")
                next ({
                    message: 'invalid email/password',
                    status : 401
                })
            }
        })
        .catch(next)
    }

    //ADMIN PRIVILAGE

    static addProduct(req, res, next){
        const {name,description, image, price, stock} = req.body
        Product.create({name, description, image, price, stock})
        .then(data =>{
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$push : {listProducts : data._id}}, {new : true})
            
        })
        .then(function(data){
            res.status(201).json(data)
        })
        .catch(next)
    }

    static seeSelfProduct(req, res, next){
        User.findOne({_id : req.loggedUser.id}).populate("listProducts")
        .then(function(data){
            // console.log(data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateProduct(req,res,next){
        const id = req.params.id
        const {name, description, image, price, stock} = req.body
        // console.log(req.body)
        User.findOne({_id : req.loggedUser.id})
        .then(function(data){
            // console.log(data, id)
            if(data.listProducts.includes(id)){
                return Product.findOneAndUpdate({_id:id}, {name,description, image, price, stock}, {new : true})
            }else {
                next({
                    status : 403,
                    message : "Not Authorized"
                })
            }
        })
        .then(function(data){
            if(data){
                res.status(200).json(data)
            }
           
        })
        .catch(next)
    }

    static deleteProduct(req,res,next){
        const id = req.params.id
        // console.log(req.body)
        User.findOne({_id : req.loggedUser.id})
        .then(function(data){
            // console.log(data, id)
            if(data.listProducts.includes(id)){
                return Product.findOneAndDelete({_id:id})
            }else {
                next({
                    status : 403,
                    message : "Not Authorized"
                })
            }
        })
        .then(function(data){
            if(data){
                res.status(200).json(data)
            }
            
        })
        .catch(next)
    }

    //USERS

    static seeAllProduct(req, res, next){
        let payload = req.loggedUser
        // console.log(payload,"liat semua produk user")
        Product.find()
        .then(function(data){
            res.status(200).json({data, payload})
        })
        .catch(next)
    }

    static createCart(req,res,next){
        Cart.findOne({UserId : req.loggedUser.id})
        .then(data =>{
            if(!data){
                return Cart.create({UserId : req.loggedUser.id})
            }else{
                next ({
                    status : 400,
                    message : "already created"
                })
            }
        })
        .then(function(data){
            res.status(201).json(data)
        })
        .catch(next)
    }

    static removeCart(req,res,next){
        Cart.findOne({UserId : req.loggedUser.id})
        .then(data=>{
            if(data){
               return Cart.findOneAndDelete({UserId : req.loggedUser.id})
            }else{
                // console.log("MASUK NIH ERR")
                next ({
                    status :404,
                    message : "no cart found"
                })
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

module.exports = UserController