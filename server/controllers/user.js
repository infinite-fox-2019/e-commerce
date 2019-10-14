const User = require('../models/user')
const { createToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcryptjs')

class UserController {
    static create(req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then((result) => {
                const token = createToken({ id: result._id })
                res.status(201).json({ username: result.username, email: result.email, token: `Bearer ${token}` })
            }).catch(next);
    }

    static login(req, res, next) {
        const { identity, password } = req.body
        User.findOne({ $or: [{ username: identity }, { email: identity }] })
            .then((result) => {
                if (result && compare(password, result.password)) {
                    const token = createToken({ id: result._id })
                    res.status(200).json({ username: result.username, email: result.email, token: `Bearer ${token}` })
                } else {
                    next({ status: 401, message: "Wrong Username / Email / Password" })
                }
            }).catch(next);
    }

    static createAdmin(req, res, next) {
        const { username, email, password, SECRET_KEY } = req.body
        if (SECRET_KEY !== process.env.SECRET_KEY) return next({ status: 401, message: "SECRET_KEY does not match" })
        User.create({ username, email, password, role: "admin" })
            .then((result) => {
                const token = createToken({ id: result._id })
                res.status(201).json({ username: result.username, email: result.email, token: `Bearer ${token}`, role: result.role })
            }).catch(next);
    }
}

module.exports = UserController