const Transaction = require('../models/transaction')
const User = require('../models/user')

class TransactionController {
    static create(req, res, next){
        User.findById(req.decoded._id)
        .populate('cart')
        .then(({cart})=>{
            let listItem = {}
            for (let i=0; i<cart.length; i++){
                listItem[cart[i]._id] = {
                    _id:cart[i]._id,
                    name : cart[i].name,
                    featured_image: cart[i].featured_image,
                    price : cart[i].price,
                    sum : 0,
                    quantity : 0
                }
            }
            for(let k in listItem){
                for (let i=0; i<cart.length; i++){
                    if(k == cart[i]._id){
                        listItem[k].quantity += 1
                    }
                }
                listItem[k].sum = listItem[k].price * listItem[k].quantity
            }
            listItem = Object.values(listItem)
            return Transaction.create({listItem : listItem, user : req.decoded._id})
            .then (data =>{
                // res.status(201).json(data)
                return   User.updateOne({ _id: req.decoded._id }, {
                    $push: { history: data._id }, $set: {cart : []}
                })
                .then(() => {
                    return User.findById(req.decoded._id)
                    .populate({path : 'history'})
                    .then(user => {
                        console.log(data);
                          res.status(201).json({
                              trx : data,
                              user : user
                          })
                        })
                    })
            })
            .catch(next)
        })
    }

    static deliveryStatus(req, res, next){
        let {status} = req.body
        Transaction.updateOne({_id : req.params.id}, {deliveryStatus : status})
        .then(()=>{
            if (status){
                res.status(200).json({
                    message : 'Thank you for purchasing with us'
                })
            }
            else {
                res.status(200).json({
                    message : `Delivery status change to false`
                })
            }
        })
        .catch(next)
    }

    static cancelation(req,res, next){
        Transaction.findById(req.params.id)
        .then(data=>{
            if (data && !data.deliveryStatus){
                data.statusTrx = false
                data.save()
                res.status(200).json({
                    message : 'Cancelation will be full process less in 24 hours'
                })
            }
            else {
                next({
                    status: 404,
                    message : 'Transaction Not Found'
                })
            }
        })
        .catch(next)
    }
}

module.exports = TransactionController