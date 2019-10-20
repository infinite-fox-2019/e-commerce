const { verifyToken } = require('../helpers/jwt')
const User  = require('../models/user')

function authentication(req, res, next) {
  try {
    let id = verifyToken(req.headers.token)
    User.findOne({ _id: id })
      .then(result => {
        // console.log(result);
        if (!result) {
          // console.log('hereeee');
          next({ status: 403, message: "Forbidden" })
        } else {
          req.decoded = result
          next()
        }
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

module.exports = authentication