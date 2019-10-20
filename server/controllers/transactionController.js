const Transaction = require('../models/transaction');

class TransactionController {
    static find (req, res, next){
        let objParams = { user: req.loggedUser.id }
        console.log(objParams);
        Transaction.find(objParams).populate(['user', 'items.id'])
            .then(transactions=>{
                console.log(transactions);
                res.status(200).json(transactions)
            })
            .catch(next)
    }
    static findById (req, res, next){
        const {id} = req.objParams
        Transaction.findById(id)
            .then(transaction=>{
                res.status(200).json(transaction)
            })
            .catch(next)
    }
    static create (req, res, next){
        const {price, items} = req.body
        const user = req.loggedUser.id
        Transaction.create({
            price, 
            items, 
            user
        })
            .then(transaction=>{
                console.log(transaction);
                res.status(201).json(transaction)
                next()
            })
            .catch(next)
    }
    static update (req,res, next){
        const {status} = req.body
        const{id} = req.params
        Transaction.update({_id:id}, {status})
            .then(response=>{
                res.status(200).json({message: 'Successfully updated transaction'})
            })
    }
}

module.exports = TransactionController