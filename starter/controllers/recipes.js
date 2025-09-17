// recipes.js
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// GET ALL RECIPES
const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ recipes, count: recipes.length });
};

// GET SINGLE RECIPE
const getRecipe = async (req, res) => {
  const {
    user: { userId },
    params: { id: recipeId },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    throw new BadRequestError(`invalid recipe ID: ${recipeId}`);
  }

  const recipe = await Recipe.findOne({
    _id: recipeId,
    createdBy: userId,
  });
  if (!recipe) {
    throw new NotFoundError(`No recipe with id ${recipeId}`);
  }
  res.status(StatusCodes.OK).json({ recipe });
};

// CREATE RECIPE
const createRecipe = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const recipe = await Recipe.create(req.body);
  res.status(StatusCodes.CREATED).json({ recipe });
};

// UPDATE RECIPE
const updateRecipe = async (req, res) => {
  const {
    body: { recipe, indredients },
    user: { userId },
    params: { id: recipeId },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    throw new BadRequestError(`Invalid recipe ID: ${recipeId}`);
  }

  if (recipe === "" || ingredients === "") {
    throw new BadRequestError("Recipe or Ingredients fields cannot be empty");
  }
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    { _id: recipeId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedRecipe) {
    throw new NotFoundError(`No recipe found with ID ${recipeId}`);
  }
  res.status(StatusCodes.OK).json({ recipe: updatedRecipe });
};

// DELETE RECIPE
const deleteRecipe = async (req, res) => {
  const {
    user: { userId },
    params: { id: recipeId },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    throw new BadRequestError(`Invalid recipe ID: ${recipeId}`);
  }

  const recipe = await Recipe.findOneAndDelete({
    _id: recipeId,
    createdBy: userId,
  });

  if (!recipe) {
    throw new NotFoundError(`No recipe found with ID ${recipeId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Recipe deleted successfully" });
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
