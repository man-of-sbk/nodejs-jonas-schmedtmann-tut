module.exports = class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // *** operational, trusted error: send message to client else
    // *** programming or other unknow error, don't leak error details
    this.isOperational = true;

    // *** don't give a shit to this one
    // Error.captureStackTrace(this, this.constructor);
  }
};
