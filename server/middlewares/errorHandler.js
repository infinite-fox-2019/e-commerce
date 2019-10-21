module.exports = (err, req, res, next) => {
    console.log(err)
    let status
    let message

    switch (err.name) {
        case 'ValidationError':
            status = 400
            let arr = []
            for (const key in err.errors) {
                arr.push(err.errors[key].message)
            }
            message = arr
            break;
        case 'AuthorizationError':
            status = 403
            message = err.message
            break;
        case 'CastError':
            status = 404
            message = 'Item by the ID not found'
            break;
        case 'Bad Request':
            status = 400
            message = err.customMessage || err
            break;
        case 'JsonWebTokenError':
            status = 401
            message = "Member access required."
            break;
        case 'NotFound':
            status = 404
            message = err.customMessage || err.message || err
            break;
        default:
            status = err.status || 500
            message = err.message || err.msg || 'Internal Server Error'
            break;
    }
    res.status(status).json(message)
}