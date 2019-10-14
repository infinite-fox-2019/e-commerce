const User = require('../models/user');
const { compare } = require('../helpers/bcrypt');
const { generateToken, verifyToken } = require('../helpers/jwt');


class UserController {

    static register(req, res, next) {

        const { name, email, password, role } = req.body;

        User.create({ name, email, password, role })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {

        const { email, password } = req.body;

        User.findOne({ email })
            .then(user => {
                if (user && compare(password, user.password)) {

                    const token = generateToken({ id: user._id, role: user.role })

                    res.status(200).json({ token })
                } else {
                    res.status(400).json({ message: 'Wrong email/password' })
                }
            })
            .catch(next)

    }

    static verify(req, res, next) {
        try {
            verifyToken(req.headers.token)
            res.status(200).json({ message: 'User verified' })
        } catch (err) {
            next(err)
        }
    }
}


module.exports = UserController