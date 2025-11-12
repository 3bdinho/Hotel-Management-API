const ApiError = require("../utils/ApiError");

// JWT handlers
const handleJWTInvalidSignature = () =>
  new ApiError("Invalid token, please login again", 401);

const handleJWTExpired = () =>
  new ApiError("Your token has expired, please login again", 401);
// MongoDB duplicate key handler
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new ApiError(
    `Duplicate field value: "${value}" for "${field}". Please use another value.`,
    400
  );
};

// Development error response
const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack,
    error: err,
  });

// Production error response
const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

// Global error handler
const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (process.env.NODE_ENV === "development") {
    if (!error.statusCode) error.statusCode = 500;
    if (!error.status) error.status = "error";
    sendErrorForDev(error, res);
  } else {
    // Transform known errors into ApiError
    if (err.name === "JsonWebTokenError") error = handleJWTInvalidSignature();
    if (err.name === "TokenExpiredError") error = handleJWTExpired();
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);

    sendErrorForProd(error, res);
  }
};

module.exports = globalErrorHandler;
