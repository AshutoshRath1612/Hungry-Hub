// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    const stack = process.env.NODE_ENV === 'production' ? '🔒' : err.stack; // Hide stack trace in production
    res.status(status).json({
      success: false,
      status,
      message,
      stack,
    });
  };
  
  module.exports = errorHandler;
  