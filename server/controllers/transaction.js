const Transaction = require('../models/transaction')

class Controller {
    static findAll(req, res, next) {
        Transaction.find().populate(['UserId', 'items.product'])
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static findByUser(req, res, next) {
        Transaction.find({ UserId: req.loggedUser._id }).populate(['UserId', 'items.product'])
            .then(data => { 
                res.status(200).json(data)
            })
            .catch(next)
    }
    static confirm(req, res, next) {
        Transaction.updateOne({ _id: req.params.id }, { status: 'confirmed' })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = Controller