const User = require('../models/user')
const { decodeToken, encodeToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
class UserController {
    static register (req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
        .then(user => {
            const
            {
                _id,
                username,
                email,
                password,
                role
            } = user
            const payload =
            {
                _id,
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
                const { _id, username, email, password, role } = user
                const payload = { _id, username, email, password, role }
                const token = encodeToken(payload)
                res.status(200).json({ username, email, role, token })
            } else {
                if (email === "") {
                    next({ msg: 'Email Is Required' })
                } else if (password === "") {
                    next({ msg: "Password Is Required" })
                } else {
                    next({ msg: 'Incorrect Email / Password' })
                }
            }
        })
        .catch(next)
    }
    static reLog(req, res, next) {
        const { token } = req.headers
        const user = decodeToken(token)
        User.findOne({ _id: user._id }).exec()
        .then(user => {
            if (user) {
                const { username, email, role } = user
                res.status(200).json({ username, email, role, token })
            } else {
                next({ msg: "User Not Found" })
            }
        })
        .catch(next)
    }
}

module.exports = UserController