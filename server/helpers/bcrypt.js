const bcrypt = require("bcryptjs")

function hashPassword(password) {
    let salt = 2
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function compare(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
    hashPassword,
    compare
}