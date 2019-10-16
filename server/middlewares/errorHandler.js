module.exports =
    (err, req, res, next) => {
        const status = err.status || 500
        const errMessage = err.message || "Internal Server Error"
        if (err.name === "ValidationError") {
            res.status(status).json({ msg: errMessage })
        } else if (err.msg === "Incorrect Email / Password") {
            res.status(400).json(err)
        } else if (err.name === "MongoError" && err.code === 11000) {
            const msg = `${Object.keys(err.keyValue)[0]} is already taken`
            res.status(400).json({ msg })
        } else if (err.msg === "Authentication Failed!") {
            res.status(401).json(err)
        } else {
            console.log(err)
        }
    }