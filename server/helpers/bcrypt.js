const bcryptjs = require('bcryptjs');

module.exports = {
    hash(inputPassword) {
        const salt = bcryptjs.genSaltSync(10);
        return bcryptjs.hashSync(inputPassword, salt)
    },
    compare(inputPassword, hash) {
        return bcryptjs.compareSync(inputPassword, hash)
    }
}