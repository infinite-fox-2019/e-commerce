const User = require('../models/user')
const { createToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcryptjs')

class UserController {
    static create(req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then((result) => {
                const token = createToken({ id: result._id, role: result.role })
                res.status(201).json({ username: result.username, email: result.email, token: `Bearer ${token}` })
            }).catch(next);
    }

    static login(req, res, next) {
        const { identity, password } = req.body
        User.findOne({ $or: [{ username: identity }, { email: identity }] })
            .then((result) => {
                if (result && compare(password, result.password)) {
                    const token = createToken({ id: result._id, role: result.role })
                    res.status(200).json({ username: result.username, email: result.email, token: `Bearer ${token}`, role: result.role })
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
                const token = createToken({ id: result._id, role: result.role })
                res.status(201).json({ username: result.username, email: result.email, token: `Bearer ${token}`, role: result.role })
            }).catch(next);
    }

    static googleSignIn(req, res, next) {
        const { OAuth2Client } = require('google-auth-library')
        const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
        const client = new OAuth2Client(GOOGLE_CLIENT_ID)
        const { token } = req.body
        let data;
        client.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID })
            .then((ticket) => {
                data = ticket.getPayload()
                const { email } = data
                return User.findOne({ email })
            })
            .then(user => {
                if (user) return user
                else {
                    return User.create({
                        username: data.family_name,
                        email: data.email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user => {
                let payload = {
                    _id: user._id
                }
                let token = createToken(payload)

                res.status(200).json({ token, username: user.username })
            })
            .catch(next);
    };

    static verifyUser(req, res, next) {
        const id = req.decode.id
        User.findById(id)
            .then((result) => {
                res.status(200).json({
                    username: result.username,
                    message: 'User Verified',
                    email: result.email,
                    role: result.role
                })
            }).catch(next);
    }

    static checkUser(req, res, next) {
        const { username } = req.body
        User.findOne({ username })
            .then((result) => {
                if (result) {
                    next({ status: 406, message: "Username is already taken" })
                } else {
                    res.status(200).json({ message: "Username available" })
                }
            }).catch(next);
    }
    static checkEmail(req, res, next) {
        const { email } = req.body
        User.findOne({ email })
            .then((result) => {
                if (result) {
                    next({ status: 406, message: "Email is already taken" })
                } else {
                    res.status(200).json({ message: "Email available" })
                }
            }).catch(next);
    }
}

module.exports = UserController