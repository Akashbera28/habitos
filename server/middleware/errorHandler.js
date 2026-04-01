export function notFoundHandler(req, res, next) {
  if (res.headersSent) {
    return next();
  }

  return res.status(404).json({
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(err, _req, res, _next) {
  if (res.headersSent) {
    return;
  }

  const statusCode = Number(err?.statusCode) || 500;
  const message = err?.message || "Unexpected server error.";

  res.status(statusCode).json({
    error: message,
  });
}

export default {
  notFoundHandler,
  errorHandler,
};