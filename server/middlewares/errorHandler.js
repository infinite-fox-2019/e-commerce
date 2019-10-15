module.exports = (err, req, res, next) => {
  let messages = []
  if(err.msg) {
    messages = err.msg
  } else if(err.name === 'ValidationError') {
    err.status = 400
    for(let field in err.errors) {
      messages.push(err.errors[field].message)
    }
  } else if(err.name === 'MongoError') {
    err.status = 400
    let field = err.errmsg.split('key: { ')[1].split(':')[0]
    messages.push(`${field.charAt(0).toUpperCase()}${field.substring(1)} is already registered`)
  }
  res.status(err.status || 500).json({messages: messages.length !== 0 ? messages : ['Something went wrong in the server']})
}