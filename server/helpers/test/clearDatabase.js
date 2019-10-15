const User = require('../../models/user');
const Product = require('../../models/product')
const Transaction = require('../../models/transaction')

module.exports = function (done) {
    if (process.env.NODE_ENV === 'test') {

        let jobs = [User.deleteMany({}), Product.deleteMany({})]

        Promise.all(jobs)
            .then(function () {
                done()
            })
            .catch(function (err) {
                done(err)
            })
    }
};