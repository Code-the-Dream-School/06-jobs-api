// routes/recipes.js

const express = require("express");
const router = express.Router();

const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipesController");

const auth = require("../middleware/authentication")

router.use(auth);

router.route("/")
.get(getAllRecipes).
post(createRecipe);

router.route("/:id")
.get(getRecipe)
.put(updateRecipe)
.delete(deleteRecipe)






module.exports = router