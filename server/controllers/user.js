const User = require('../models/user')
const { encodeToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
class UserController {
    static register (req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
        .then(user => {
            const
            {
                username,
                email,
                password,
                role
            } = user
            const payload =
            {
                username,
                email,
                password,
                role
            }
            const token = encodeToken(payload)
            res.status(201).json({ username, email, role, token })
        })
        .catch(next)
    }
    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({ email }).exec()
        .then(user => {
            if (user && comparePassword(password, user.password)) {
                const { username, email, password, role } = user
                const payload = { username, email, password, role }
                const token = encodeToken(payload)
                res.status(200).json({ username, email, role, token })
            } else {
                next({ msg: "Incorrect Email / Password" })
            }
        })
    }
}

module.exports = UserController