const AppError = require('../utils/AppError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB=err => {
  const value = err.errmsg.match(/(["'])(\\?.)*\1/)[0];
  console.log(value);
  const message = `Duplicate field value :${value} please use another value.`;
  return new AppError(message, 400);

};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  res.status(err.status || 500).json({ 
    error: err.message,
    stack: err.stack,
    status: err.status
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.status || 500).json({ 
      error: err.message,
      status: err.status
    });
  } else {
    console.error("Error: ", err);
    res.status(500).json({ 
      message: "Something went wrong"
    });
  }
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code ===11000) error=handleDuplicateErrorDB(error);
    if (error.name === 'ValidationError') error =handleValidationErrorDB(error);
    sendErrorProd(error, req, res);
  }
};
