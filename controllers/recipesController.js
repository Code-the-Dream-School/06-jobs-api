// controllers/recipes.js
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// GET ALL RECIPES
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user.userId });
    res.status(200).json({ recipes });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

// GET SINGLE RECIPE
const getRecipe = async (req, res) => {
  try {
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
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      res
        .status(error.statusCode || StatusCodes.BAD_REQUEST)
        .json({ msg: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  }
};

// CREATE RECIPE
const createRecipe = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const recipe = await Recipe.create(req.body);
    res.status(StatusCodes.CREATED).json({ recipe });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

// UPDATE RECIPE
// controllers/recipes.js
const updateRecipe = async (req, res) => {
  try {
    const {
      body: { name, ingredients, method, difficulty, prepTime, isVegetarian },
      user: { userId },
      params: { id: recipeId },
    } = req;

    console.log("UPDATE RECIPE BODY:", req.body);
    console.log("UPDATE RECIPE PARAMS:", req.params);
    console.log("USER ID:", userId);

    // Validate recipeId
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      throw new BadRequestError(`Invalid recipe ID: ${recipeId}`);
    }

    // Normalize ingredients: always make it an array
    let normalizedIngredients = [];
    if (Array.isArray(ingredients)) {
      normalizedIngredients = ingredients.map((i) => i.trim()).filter(Boolean);
    } else if (typeof ingredients === "string") {
      normalizedIngredients = ingredients.split(",").map((i) => i.trim()).filter(Boolean);
    }

    // Validate required fields
    if (!name || !normalizedIngredients.length || !method || !difficulty || !prepTime) {
      throw new BadRequestError("Please provide all required fields");
    }

    // Update the recipe
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, createdBy: userId },
      { name, ingredients: normalizedIngredients, method, difficulty, prepTime, isVegetarian },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      throw new NotFoundError(`No recipe found with id ${recipeId}`);
    }

    res.status(StatusCodes.OK).json({ recipe: updatedRecipe });
  } catch (error) {
    console.log("UPDATE RECIPE ERROR:", error);
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({ msg: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
    }
  }
};


// DELETE RECIPE
const deleteRecipe = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: recipeId },
    } = req;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      throw new BadRequestError(`Invalid recipe ID: ${recipeId}`);
    }

    const deletedRecipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      createdBy: userId,
    });

    if (!deletedRecipe) {
      throw new NotFoundError(`No recipe found with ID ${recipeId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "Recipe deleted successfully" });
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      res
        .status(error.statusCode || StatusCodes.BAD_REQUEST_ERROR)
        .json({ msg: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
