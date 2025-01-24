const errorHandler = (err, req, res, next) => {
  // Only handle errors when response object exists
  if (res) {
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({
      name: err.name,
      message: err.message,
      status: statusCode,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
  } else {
    // Handle non-Express context errors
    console.error('Critical startup error:', err);
    process.exit(1); // Exit the process for startup errors
  }
};

export default errorHandler;