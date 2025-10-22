import {
  setInputEnabled,
  getInputEnabled,
  getMessage,
  setMessage,
  setDiv,
  getToken,
} from "./index.js";
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
  const message = getMessage();

  addEditDiv.addEventListener("click", async (e) => {
    if (getInputEnabled() && e.target.nodeName === "BUTTON") {
      if (e.target === addingRecipeBtn) {
        setInputEnabled(false);

        const difficulty = document.getElementById("difficulty").value;
        const prepTime = parseInt(document.getElementById("prepTime").value);
        const isVegetarian = document.getElementById("isVegetarian").checked;

        const url = currentRecipeId
          ? `/api/v1/recipes/${currentRecipeId}`
          : "/api/v1/recipes";
        const method = currentRecipeId ? "PUT" : "POST";

        try {
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },

            body: JSON.stringify({
              name: recipeInput.value,
              ingredients: ingredientsInput.value,
              method: methodInput.value,
              difficulty,
              prepTime,
              isVegetarian,
            }),
          });

          const data = await response.json();

          if (response.status === 200 || response.status === 201) {
            if (message) {
              message.textContent = currentRecipeId
                ? "The recipe was updated."
                : "The recipe was created.";
            }

            // Clear inputs
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

        setInputEnabled(true);
      } else if (e.target === editCancel) {
        currentRecipeId = null;
        message.textContent = "";
        showRecipes();
      }
    }
  });
};

export const showAddEdit = async (recipeId = null) => {
  const formDiv = document.getElementById('edit-recipe')
  const formTitle = document.getElementById('form-title')
  const message = getMessage();

  currentRecipeId = recipeId;
  formTitle.textContent = recipeId ? "Edit Recipe" : "Add Recipe"
 formDiv.style.display = "block"
message.textContent = "";



  // Clear previous values
  document.getElementById('recipe').value=''
  document.getElementById('ingredients').value=''
  document.getElementById('method').value = ''
  document.getElementById('difficulty').value = 'Easy'
  document.getElementById('prepTime').value = ''
  document.getElementById('isVegetarian').checked = false;

if (recipeId) {
  try {
    const response = await fetch(`/api/v1/recipes/${recipeId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });

const data = await response.json();

if (response.ok) {
  document.getElementById("recipe").value = data.recipe.recipe
  document.getElementById("ingredients").value = data.recipe.ingredients
  document.getElementById("method").value = data.recipe.method
  document.getElementById("difficulty").value = data.recipe.difficulty
  document.getElementById("prepTime").value = data.recipe.prepTime
  document.getElementById("isVegetarian").checked =data.recipe.isVegetarian
} else {
  message.textContent = data.msg || "Failed to load recipe."

} 
  } catch (err) {
    console.error(err)
    message.textContent = "A communication error occurred."
  }

}
}
