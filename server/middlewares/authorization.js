'use strict'

const { Transaction } = require('../models')

module.exports = {
  admin: function (req, res, next) {
    if (req.decoded.email === 'admin@gamestop.com') {
      next()
    } else {
      console.log('Authorization failed')
      next({ status: 403, message: 'Unauthorized process' })
    }
  },
  transaction: function (req, res, next) {
    const id = req.params.id
    Transaction.findById(id)
      .then((transaction) => {
        if (String(transaction.buyer) === String(req.decoded.id)) {
          next()
        } else {
          console.log('Authorization failed!')
          next({ status: 403, message: 'Unauthorized process' })
        }
      }).catch(next)
  }
}
