module.exports = function(err,req,res,next){
    console.log("INI MIDWERE")
    // console.log(err.status)
    let status
    let message

    switch (err.name) {
        case 'ValidationError':
            status = 400
            let arr = []
            for (const key in err.errors) { arr.push(err.errors[key].message) }
            message = arr
            console.log(message)
            break;
        case 'JsonWebTokenError':
            status = 401
            message = err.message
            break;
        default:
            
            status = err.status || 500
            message = err.message || err.msg || 'Internal Server Error'
            break;
    }
    console.log(status, message)
    res.status(status).json({ code: status, message })
}