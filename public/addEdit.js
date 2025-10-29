// addEdit.js
import {
  getInputEnabled,
  setInputEnabled,
  setDiv,
  getToken,
  setMessage,
  getMessage,
} from "./index.js";
import { showRecipes } from "./recipes.js";

let currentRecipeId = null;

const recipeInput = () => document.getElementById("recipe");
const ingredientsInput = () => document.getElementById("ingredients");
const methodInput = () => document.getElementById("method");
const difficultyInput = () => document.getElementById("difficulty");
const prepTimeInput = () => document.getElementById("prepTime");
const isVegetarianInput = () => document.getElementById("isVegetarian");
const formDiv = () => document.getElementById("edit-recipe");
const formTitle = () => document.getElementById("form-title");
const addingRecipeBtn = () => document.getElementById("adding-recipe");
const cancelBtn = () => document.getElementById("edit-cancel");

export const handleAddEdit = () => {
  // Save button
  addingRecipeBtn().addEventListener("click", async () => {
    if (!getInputEnabled()) return;
    setInputEnabled(false);

    const message = getMessage();
    message.textContent = "";

    const recipeData = {
      name: recipeInput().value.trim(),
      ingredients: ingredientsInput().value.trim(),
      method: methodInput().value.trim(),
      difficulty: difficultyInput().value,
      prepTime: parseInt(prepTimeInput().value),
      isVegetarian: isVegetarianInput().checked,
    };

    const url = currentRecipeId
      ? `/api/v1/recipes/${currentRecipeId}`
      : "/api/v1/recipes";

    const method = currentRecipeId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(recipeData),
      });

      const data = await res.json();

      if (res.ok) {
        message.textContent = currentRecipeId
          ? "Recipe updated successfully!"
          : "Recipe created successfully!";
        clearForm();
        currentRecipeId = null;
        showRecipes();
      } else {
        message.textContent = data.msg || "Failed to save recipe.";
      }
    } catch (err) {
      console.error(err);
      message.textContent = "Server communication error.";
    } finally {
      setInputEnabled(true);
    }
  });

  // Cancel button
  cancelBtn().addEventListener("click", () => {
    clearForm();
    currentRecipeId = null;
    showRecipes();
  });
};

// Show Add/Edit form
export const showAddEdit = async (recipeId = null) => {
  currentRecipeId = recipeId;
  setDiv(formDiv());
  formTitle().textContent = recipeId ? "Edit Recipe" : "Add Recipe";
  setMessage(getMessage()); // reset message
  getMessage().textContent = "";

  // Clear form first
  clearForm();

  if (!recipeId) return;

  // Fetch existing recipe
  try {
    const res = await fetch(`/api/v1/recipes/${recipeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      recipeInput().value = data.recipe.name;
      ingredientsInput().value = data.recipe.ingredients;
      methodInput().value = data.recipe.method;
      difficultyInput().value = data.recipe.difficulty;
      prepTimeInput().value = data.recipe.prepTime;
      isVegetarianInput().checked = data.recipe.isVegetarian;
    } else {
      getMessage().textContent = data.msg || "Failed to load recipe.";
    }
  } catch (err) {
    console.error(err);
    getMessage().textContent = "Server communication error.";
  }
};

// Helper to clear the form
const clearForm = () => {
  recipeInput().value = "";
  ingredientsInput().value = "";
  methodInput().value = "";
  difficultyInput().value = "Easy";
  prepTimeInput().value = "";
  isVegetarianInput().checked = false;
};
