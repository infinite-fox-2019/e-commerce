
module.exports = (err, req, res, next) => {
    console.log(err.status, "\x1b[31m", err.message)

    let status
    let message

    switch (err.name) {
        case 'ValidationError':
            status = 400
            let arr = []
            for (const key in err.errors) { arr.push(err.errors[key].message) }
            message = arr
            break;
        case 'JsonWebTokenError':
            status = 401
            message = "Token is not set or expired or malformed. Please register or (re)login to get a new token."
            break;
        case 'MulterError':
            status = 400
            message = err.message
        default:
            status = err.status || 500
            message = err.message || err.msg || 'Internal Server Error'
            break;
    }
    res.status(status).json({ code: status, message })
}
