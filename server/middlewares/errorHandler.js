module.exports = (err, req, res, next) => {

    let name = err.name
console.log(err)
    switch (name) {
        case "ValidationError":
            var message = []
            for (let key in err.errors) {
                message.push(err.errors[key].message)
            }
            res.status(422).json({ message })
            break;
        case "MongoError":
            var message = 'Duplication data in database'
            res.status(422).json({ message })
            break
        case "LoginError":
            var message = 'wrong email/password'
            res.status(422).json({ message })
            break
        case "CastError":
            var message = 'data not found'
            res.status(404).json({ message })
            break
        case "AuthenticationError":
            var message = 'authentication error'
            res.status(403).json({ message })
            break
        case 'AuthorizationError':
            var message = 'authorization error'
            res.status(403).json({ message })
            break
        default:
            res.status(500).json({ message: 'internal server error' })
            break;
    }
}