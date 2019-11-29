const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // *** operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
    // *** programming or other unknow error, don't leak error details
  } else {
    // *** 1) log error
    console.error('Error', err);

    // *** 2) send generic message
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong !'
    });
  }
};

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicatedFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value !`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  // *** Object.values add value of a object's properties to an Array
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    // *** 'casting' error type. READMORE in course-summary in video num 10 in this section
    if (error.name === 'CastError') error = handleCastErrorDB(err);

    // *** 'mongodb' error type. READMORE in course-summary in video num 10 in this section
    if (error.code === 11000) error = handleDuplicatedFieldsDB(err);

    // *** 'validator' error type. READMORE in course-summary in video num 10 in this section
    if (error.name === 'ValidationError') error = handleValidationErrorDB(err);

    sendErrorProd(error, res);
  }
};
