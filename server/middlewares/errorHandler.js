module.exports =
    (err, req, res, next) => {
        const status = err.status || 500
        const errMessage = err.message || "Internal Server Error"
        if (err.name === "ValidationError") {
            res.status(status).json({ msg: errMessage })
        } else {
            console.log(err)
        }
    }