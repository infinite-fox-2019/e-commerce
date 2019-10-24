const User = require('../models/user')
const { tokenGenerate } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

class userController {

    static register(req, res, next) {
        const { name, email, password, role } = req.body
        User.create({ name, email, password, role })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && comparePassword(password, user.password)) {
                    let payload = {
                        id: user._id,
                        role: user.role
                    }

                    let token = tokenGenerate(payload)
                    res.status(200).json({ token, role: user.role })
                } else {
                    next({
                        status: 401,
                        message: `Invalid email/password`
                    })
                }
            })
            .catch(next)
    }
}

module.exports = userController