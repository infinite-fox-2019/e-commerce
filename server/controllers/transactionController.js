const Transaction = require('../models/transaction');
const Product = require('../models/product');

class TransactionController {
    static find (req, res, next){
        let objParams
        if(req.loggedUser.role === 'user') objParams = { user: req.loggedUser.id }
        // console.log(objParams);
        Transaction.find(objParams).populate('user').populate('items.id').sort({createdAt: -1})
            .then(transactions=>{
                // console.log(transactions);
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
        let ids = []
        items.forEach(item => {
            ids.push({id: item.id._id, qty: item.qty})
        });
        console.log(ids);
        const user = req.loggedUser.id
        Transaction.create({
            price, 
            items, 
            user
        })
            .then(transaction=>{
                // console.log(transaction);
                let promises = []

                ids.forEach(id=>{
                    promises.push(Product.findById(id.id))
                })
                return Promise.all(promises)
            })
            .then(products =>{
                console.log(products);
                let promises = []
                products.forEach((product, index) => {
                    product.stock -= ids[index].qty 
                    promises.push( product.save() )
                })
                return Promise.all(promises)
            })
            .then(response=>{
                res.status(201).json({message: 'success create transaction'})
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