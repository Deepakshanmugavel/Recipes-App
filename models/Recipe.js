const mongoose = require("mongoose");

/**
 * Recipe model (the "M" in MVC).
 */
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one ingredient is required",
      },
    },
    instructions: {
      type: String,
      required: [true, "Instructions are required"],
      trim: true,
    },
    cookingTime: {
      type: Number,
      min: [1, "Cooking time must be at least 1 minute"],
    },
    servings: {
      type: Number,
      min: [1, "Servings must be at least 1"],
      default: 1,
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "hard"],
        message: "Difficulty must be easy, medium or hard",
      },
      default: "easy",
    },
    category: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
