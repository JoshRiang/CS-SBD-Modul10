class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack,
    payload: null,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      payload: null,
    });
  }

  console.error('PROGRAMMING_ERROR', err);
  return res.status(500).json({
    success: false,
    message: 'Something went wrong',
    payload: null,
  });
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.isOperational = err.isOperational || false;

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  } else {
    return sendErrorProd(err, res);
  }
};

module.exports = { AppError, errorHandler };