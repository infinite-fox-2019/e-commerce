const { User, Product, Transaction } = require("../../models");

module.exports = function(done) {
  if (process.env.NODE_ENV === "test") {
    Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Transaction.deleteMany({})
    ])
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
  }
};
