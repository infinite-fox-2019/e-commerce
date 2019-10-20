module.exports = (err, req, res, next) => {
  console.log(err.message)
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
    if(field === 'product') {
      messages.push(`${field.charAt(0).toUpperCase()}${field.substring(1)} is already in the cart`)
    } else {
      messages.push(`${field.charAt(0).toUpperCase()}${field.substring(1)} is already registered`)
    }
  } else if(err.message === `Cannot read property 'originalname' of undefined`) {
    err.status = 400
    messages.push('You have to upload an image')
  }
  console.log(messages)
  res.status(err.status || 500).json({messages: messages.length !== 0 ? messages : ['Something went wrong in the server']})
}