module.exports = (err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json(err.msg || 'Something went wrong in the server')
}