const Recipe = require("../models/Recipe");

// Wraps async handlers so errors reach the error-handling middleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Only these fields can be set by the client
const pickFields = (body) => {
  const allowed = [
    "title",
    "description",
    "ingredients",
    "instructions",
    "cookingTime",
    "servings",
    "difficulty",
    "category",
  ];
  const data = {};
  allowed.forEach((key) => {
    if (body[key] !== undefined) data[key] = body[key];
  });
  return data;
};

// @desc    Create a new recipe
// @route   POST /api/recipes
exports.createRecipe = asyncHandler(async (req, res) => {
  const data = pickFields(req.body);
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ success: false, message: "Request body is empty" });
  }
  const recipe = await Recipe.create(data);
  res.status(201).json({ success: true, message: "Recipe created", data: recipe });
});

// @desc    Get all recipes
// @route   GET /api/recipes
exports.getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: recipes.length, data: recipes });
});

// @desc    Get a single recipe by ID
// @route   GET /api/recipes/:id
exports.getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ success: false, message: "Recipe not found" });
  }
  res.status(200).json({ success: true, data: recipe });
});

// @desc    Update a recipe by ID
// @route   PUT /api/recipes/:id
exports.updateRecipe = asyncHandler(async (req, res) => {
  const data = pickFields(req.body);
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ success: false, message: "No valid fields provided to update" });
  }
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!recipe) {
    return res.status(404).json({ success: false, message: "Recipe not found" });
  }
  res.status(200).json({ success: true, message: "Recipe updated", data: recipe });
});

// @desc    Delete a recipe by ID
// @route   DELETE /api/recipes/:id
exports.deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) {
    return res.status(404).json({ success: false, message: "Recipe not found" });
  }
  res.status(200).json({ success: true, message: "Recipe deleted", data: {} });
});
