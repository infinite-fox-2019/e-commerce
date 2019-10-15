module.exports = {
    admin: (req, res, next) => {
        if (req.decode.role === 'admin') {
            next()
        } else {
            next({ status: 403, message: "Only administrator may access this resource" })
        }
    }
}