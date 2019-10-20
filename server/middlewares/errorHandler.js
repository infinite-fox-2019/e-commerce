module.exports =
    (err, req, res, next) => {
        if (err.name === "ValidationError") {
            res.status(400).json({ msg: `Invalid input` })
        } else if (err.msg === "Incorrect Email / Password") {
            res.status(400).json(err)
        } else if (err.name === "MongoError" && err.code === 11000) {
            if (err.errmsg === `E11000 duplicate key error collection: e-commerce.users index: username_1 dup key: { : "Audrick" }`) {
                res.status(400).json({ msg: "Username Is Already Taken" })
            } else if (err.errmsg === ``) {

            } else {
                console.log(err)
            }
        } else if (err.msg === "Authentication Failed!") {
            res.status(401).json(err)
        } else {
            console.log(err)
        }
    }