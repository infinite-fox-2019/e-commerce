function errorHandler(err, req, res, next) {
  let httpStatus, message;

  if (err.name == "JsonWebTokenError") {
    httpStatus = 401;
    message = ["unauthorized"];
  } else if (err.name == "ValidationError") {
    httpStatus = 400;
    let validationMsg = [];
    for (prop in err.errors) {
      validationMsg.push(err.errors[prop].message);
    }
    message = validationMsg;
  } else if (err.name == "CastError") {
    httpStatus = 400;
    message = ["failed to cast a value"];
  } else {
    httpStatus = err.httpStatus || 500;
    message = err.msg ? [err.msg] : ["internal server error"];
  }

  res.status(httpStatus).json({
    message
  });
}

module.exports = errorHandler;
