// middleware/errorHandler.js
// Global error handler — must be registered LAST in Express (after all routes).
// Catches any error passed via next(err) from controllers.

const errorHandler = (err, req, res, next) => {
  // Use HTTP status from error object or fall back to 500
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    // Show stack trace only in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
