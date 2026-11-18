const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the MONGO_URI environment variable.
 */
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
