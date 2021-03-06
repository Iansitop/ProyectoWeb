module.exports = (err, req, res, next) => {
  //Manejo los casos donde sea 404
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
}
