const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const validateId = require("../middleware/validateId");

const router = express.Router();

router.route("/").post(createRecipe).get(getAllRecipes);

router
  .route("/:id")
  .get(validateId, getRecipeById)
  .put(validateId, updateRecipe)
  .delete(validateId, deleteRecipe);

module.exports = router;
