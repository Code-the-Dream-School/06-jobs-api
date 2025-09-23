import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let recipesDiv = null;
let recipesTable = null;
let recipesTableHeader = null;

export const handleRecipes = () => {
  recipesDiv = document.getElementById("recipes");
  const logoff = document.getElementById("logoff");
  const addRecipe = document.getElementById("add-recipe");
  recipesTable = document.getElementById("recipes-table");
  recipesTableHeader = document.getElementById("recipes-table-header");

  recipesDiv.addEventListener("click", async (e) => {
    const target = e.target;
    if (inputEnabled && target.nodeName === "BUTTON") {
      if (target === addRecipe) {
        showAddEdit(null);
      } else if (target === logoff) {
        setToken(null);
        message.textContent = "You have been logged off.";
        recipesTable.replaceChildren([recipesTableHeader]);
        showLoginRegister();
      } else if (target.classList.contains("edit-button")) {
        const recipeId = target.dataset.id;
        showAddEdit(recipeId);
      } else if (target.classList.contains("delete-button")) {
        const recipeId = target.dataset.id;
        if (!confirm("Are you sure you want to delete this recipe?")) return;
        try {
          const response = await fetch(`/api/v1/recipes/${recipeId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (response.status === 200) {
            message.textContent = data.msg || "The recipe was deleted.";
            showRecipes();
          } else {
            message.textContent = data.msg || "An error occurred.";
          }
        } catch (err) {
          console.error(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      }
    }
  });
};

export const showRecipes = async () => {
  setDiv(recipesDiv);
  message.textContent = "Loading...";

  try {
    const response = await fetch("/api/v1/recipes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      const recipes = data.recipes;

      // Clear table and add header
      recipesTable.replaceChildren([recipesTableHeader]);

      if (recipes.length === 0) {
        message.textContent = "No recipes found.";
        return;
      }

      for (const recipe of recipes) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = recipe.recipe;

        const ingredientsCell = document.createElement("td");
        ingredientsCell.textContent = recipe.ingredients;

        const methodCell = document.createElement("td");
        methodCell.textContent = recipe.method;

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.dataset.id = recipe._id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.dataset.id = recipe._id;

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(ingredientsCell);
        row.appendChild(methodCell);
        row.appendChild(actionsCell);

        recipesTable.appendChild(row);
      }

      message.textContent = "";
    } else {
      message.textContent = data.msg || "Failed to load recipes.";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "A communication error occurred.";
  }
};
