const errorhandler = (err,req,res,next)=>{
  switch (err.name) {
    case 'ValidationError':
      let errArr = []
      for (let key in err.errors){
        errArr.push(err.errors[key].message)
      }
      let status = 400;
      res.status(status).json(errArr)
    break;
    case 'Password cannot empty':
      res.status(400).json(err.name)
    break;
    case 'Email already in use':
      res.status(400).json(err.name)
    break;
    case 'Email format is invalid':
      res.status(400).json(err.name)
    break;
    case 'Email/Password wrong':
      res.status(403).json(err.name)
    break;
    default:
      let msg = 'Internal server error'
      res.status(500).json(msg)
      break;
  }
}

module.exports = errorhandler
