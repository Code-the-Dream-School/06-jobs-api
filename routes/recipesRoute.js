// routes/recipesRoute.js

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

router
.route("/")
.get(auth, getAllRecipes).
post(auth, createRecipe);

router.route("/:id")

.get(auth, getRecipe)
.put(auth, updateRecipe)
.delete(auth, deleteRecipe)


module.exports = router;





