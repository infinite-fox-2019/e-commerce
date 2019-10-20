module.exports = (err,req,res,next)=>{
    if(err.name=='ValidationError'){
        res.status(403).json({msg: 'Validation Error'})
    }else if(err.code == 11000){
        res.status(403).json({msg: 'Email Allready Used'})
    }else if(err.msg == 'Wrong'){
        res.status(403).json({msg: 'Username/password Wrong!'})
    }else if(err.msg == 'nameUsed'){
        res.status(403).json({msg: 'Name Allready Used'})
    }else if(err.msg == 'Authen'){
        res.status(403).json({msg: 'Authentication Error'})
    }else if(err.msg == 'Author'){
        res.status(403).json({msg: 'Authorization Error'})
    }else if(err.name == 'CastError'){
        res.status(404).json({msg: 'Product Not Found'})
    }else{
        res.status(500).json({msg: 'Internal Server Error'})
    }
}