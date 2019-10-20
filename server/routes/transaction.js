const Router = require('express').Router(),
    TransactionController = require('../controllers/transaction'),
    authentication = require('../middlewares/authentication'),
    { admin, transaction } = require('../middlewares/authorization')

Router.use(authentication)

Router.get('/create', TransactionController.create)

Router.get('/pending', admin, TransactionController.getPendingTransactions)
Router.get('/approved', admin, TransactionController.getApprovedTransactions)

Router.patch('/approved/:id', admin, TransactionController.setApproved)
Router.patch('/delivered/:id', transaction, TransactionController.setDelivered)

Router.get('/:id', transaction, TransactionController.getSingleTransaction)
Router.get('/', TransactionController.getTransactions)


module.exports = Router;