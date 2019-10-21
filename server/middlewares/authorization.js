function authorization (req,res,next){
    if (req.decode.email === 'james_ciri@yahoo.com'){
        next()
    } else {
        next({
            name: 'Unauthorized action', 
            message: 'Unauthorized'}) 
    }

}

module.exports = authorization