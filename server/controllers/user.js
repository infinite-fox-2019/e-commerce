const User = require('../models/user')
const { createToken } = require('../helpers/jwt')

class UserController {
    static create(req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then((result) => {
                const token = createToken({ id: result._id })
                res.status(201).json({ username: result.username, email: result.email, token: `Bearer ${token}` })
            }).catch(next);
    }
}

module.exports = UserController