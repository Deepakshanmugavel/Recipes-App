// 404 handler for unknown routes
exports.notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

// Centralized error handler
exports.errorHandler = (err, req, res, next) => {
  // Mongoose validation errors -> 400
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }
  // Invalid JSON body -> 400
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON in request body" });
  }
  // Bad cast (e.g. wrong type for a field) -> 400
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: `Invalid value for ${err.path}` });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
};
