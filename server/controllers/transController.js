const Transaction = require('../models/transaction');
const {sendMail} = require('../helpers/sendMail');

class CartController {
    static findSpesific(req,res,next){
        Transaction.find({
            UserId : req.loggedUser._id
        })
            .then(cust=>{
                res.status(200).json(cust);
            })
            .catch(err=>{
                next(err);
            })
    }
    static findForAdmin(req,res,next){
        Transaction.find()
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(next)
    }
    static delete(req,res,next){
        Transaction.deleteOne({_id: req.params.id})
            .then(_=>{
                res.status(200).json({msg:'success deleted'})
            })
            .catch(err=>{
                next(err)
            })
    }
    static createTrans(req,res,next){
        const {brand,name,transactionId,dp,date,minus} = req.body;
        const username = req.loggedUser.username
        const email = req.loggedUser.email
        Transaction.create({
            brand,
            name,
            buyer: username,
            date,
            transactionId,
            dp,
            minus
        })
            .then(_=>{
                sendMail(email,{
                    msg: `
Thank you ${username} for making a purchase ...
information:
Transaction Id: ${transactionId},
Car: ${brand} ${name},
DP: ${dp},
Minus: ${minus},
CreatedAt: ${date}
This transaction is valid 2 days from the date of making this card.
additional information can send a message to this email thank you.
NB: This message is sent automatically * (this is only a project task, don't take it seriously :)
                    `
                })
                res.status(201).json({msg:'success create Transaction,Check your Email to get Your Transaction Id'});
            })
            .catch(err=>{
                next(err);
            })
    }
}


module.exports = CartController;