import { setInputEnabled, getInputEnabled, message, setDiv, getToken } from "./index.js";
import { showRecipes } from "./recipes.js";

let addEditDiv = null;
let recipeInput = null;
let ingredientsInput = null;
let methodInput = null;
let addingRecipeBtn = null;
let currentRecipeId = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-recipe");
  recipeInput = document.getElementById("recipe");
  ingredientsInput = document.getElementById("ingredients");
  methodInput = document.getElementById("method");
  addingRecipeBtn = document.getElementById("adding-recipe");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {


      if (e.target === addingRecipeBtn) {
        enableInput(false);


        const difficulty = document.getElementById("difficulty").value;
        const prepTime = parseInt(document.getElementById("prepTime").value);
        const isVegetarian = document.getElementById("isVegetarian").Checked;

        const url = currentRecipeId
          ? `/api/v1/recipes/${currentRecipeId}`
          : "/api/v1/recipes";
        const method = currentRecipeId ? "PUT" : "POST";

        try {
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken}`,
            },

           
            body: JSON.stringify({
              recipe: recipeInput.value,
              ingredients: ingredients.value,
              method: methodElem.value,
              difficulty: document.getElementById("difficulty").value,
              prepTime: parseInt(document.getElementById("prepTime").value),
              isVegetarian: document.getElementById("isVegetarian").checked,
            }),
          });

          const data = await response.json();

          if (response.status === 200 || response.status === 201) {
            message.textContent = currentRecipeId
              ? "The recipe was updated."
              : "The recipe was created.";

            recipeInput.value = "";
            ingredientsInput.value = "";
            methodInput.value = "";
            document.getElementById("difficulty").value = "Easy";
            document.getElementById("prepTime").value = "";
            document.getElementById("isVegetarian").checked = false;

            currentRecipeId = null;

            showRecipes();
          } else {
            message.textContent = data.msg || "An error occurred.";
          }
        } catch (err) {
          console.error(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        currentRecipeId = null;
        message.textContent = "";
        showRecipes();
      }
    }
  });
};

export const showAddEdit = async (recipeId) => {
  message.textContent = "";
  setDiv(addEditDiv);

  if (recipeId) {
    // Load recipe for editing
    try {
      const response = await fetch(`/api/v1/recipes/${recipeId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        recipeInput.value = data.recipe.recipe;
        ingredientsInput.value = data.recipe.ingredients;
        methodInput.value = data.recipe.method;
        currentRecipeId = recipeId;
      } else {
        message.textContent = data.msg || "Failed to load recipe.";
        showRecipes();
      }
    } catch (err) {
      console.error(err);
      message.textContent = "A communication error occurred.";
      showRecipes();
    }
  } else {
    // Clear fields for new recipe
    recipeInput.value = "";
    ingredientsInput.value = "";
    methodInput.value = "";
    currentRecipeId = null;
  }
};
