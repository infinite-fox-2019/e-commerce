const User = require('../models/user')

class SuperuserController {
    static register(req, res, next) {
        const { username, email, password } = req.body
        const role = "admin"
        User.create({ username, email, password, role })
        .then(() => {
            res.status(201).json({ response: "Admin Registered Successfully" })
        })
        .catch(next)
    }
    static delete(req, res, next) {
        const { id } = req.params
        User.deleteOne({ _id: id }).exec()
        .then(() => {
            res.status(200).json({ response: "Admin Removed Successfully" })
        })
        .catch(next)
    }
}

module.exports = SuperuserController