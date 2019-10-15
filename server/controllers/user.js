const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { getToken } = require('../helpers/jwt')

class UserController {
     static create(req, res, next) {
        const { name, email,address, password } = req.body
        User.create({
          name,
          email,
          address,
          password,
        })
          .then(data => {
            const {name , email, address, password} = data
            res.status(201).json({
              name, email, address, password,
              token : getToken({_id : data._id, email : data.email})
            })
          })
          .catch(next)
      }
      static login(req, res, next) {
        let { email, password } = req.body;
        if (!email || !password) {
          next({
            status: 400,
            message: 'Email/Password is required'
          })
        }
        else {
          User.findOne({ email })
            .then(result => {
              if (result && comparePassword(password, result.password)) {
                  let { _id, email } = result
                  res.status(200).json({
                    token: getToken({_id, email}),
                    name : result.name,
                    address: result.address,
                    email: result.email
                  })
                }
                else {
                  next({
                    status: 400,
                    message: 'Wrong email/password'
                  })
                }
            })
            .catch(next)
        }
      }
}

module.exports = UserController