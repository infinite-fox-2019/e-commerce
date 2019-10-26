module.exports =
    (err, req, res, next) => {
        console.log(err)
        if (err.name === "ValidationError") {
            let errors = []
            for (let key in err.errors) {
                errors.push(err.errors[key].message)
            }
            res.status(400).json({ errors })
        } else if (err.msg === "Email Is Required" ||
                   err.msg === "Password Is Required" ||
                   err.msg === "Incorrect Email / Password") {
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