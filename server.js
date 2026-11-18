require("dotenv").config();
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Parse JSON request bodies
app.use(express.json());

// View: simple landing page that lists the API endpoints
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Routes
app.use("/api/recipes", recipeRoutes);

// 404 + centralized error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
