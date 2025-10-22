import {
  getInputEnabled,
  setDiv,
  setToken,
  getToken,
  setInputEnabled,
  getMessage,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let recipesDiv = null;
let recipesTable = null;
let recipesTableHeader = null;

export const handleRecipes = () => {
  recipesDiv = document.getElementById("recipes-div");
  const logoff = document.getElementById("logoff");
  const addRecipe = document.getElementById("add-recipe");
  recipesTable = document.getElementById("recipes-table");
  recipesTableHeader = document.getElementById("recipes-table-header");

  recipesDiv.addEventListener("click", async (e) => {
    const target = e.target;
    const message = getMessage();

    if (getInputEnabled() && target.nodeName === "BUTTON") {
      if (target === addRecipe) {
        showAddEdit(null);
      } else if (target === logoff) {
        setToken(null);
        message.textContent = "You have been logged off.";
        const tableBody = recipesTable.querySelector("tbody")
        if (tableBody) {
          tableBody.innerHTML = ""
        }
        
        showLoginRegister();
        document.getElementById("login-form").style.display = "block"
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
              Authorization: `Bearer ${getToken()}`,
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
        setInputEnabled(true);
      }
    }
  });
};

export const showRecipes = async () => {
  recipesTable = document.getElementById("recipes-table");
  recipesTableHeader = document.getElementById("recipes-table-header");

  const recipesDiv = document.getElementById("recipes-div");
  setDiv(recipesDiv);
  const message = getMessage();
  message.textContent = "Loading...";

  try {
    const response = await fetch("/api/v1/recipes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch (err) {
      const rawText = await response.text();
      console.error("Failed to parse JSON:", err);
      console.error("Raw response:", rawText);
      message.textContent = "Unexpected response from server.";
      return;
    }

    if (response.status === 200) {
      const recipes = data.recipes;

      if (!Array.isArray(recipes) || recipes.length === 0) {
        message.textContent = "No recipes found.";
        return;
      }

      // Clear table and add header
      const tableBody = recipesTable.querySelector("tbody");
      if (!tableBody) {
        console.error("No <tbody> found inside #recipes-table");
        message.textContent = "Internal error: cannot display recipes."
        return;
      }
      tableBody.innerHTML = "";

      for (const recipe of recipes) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = recipe.name;

        const ingredientsCell = document.createElement("td");
        ingredientsCell.textContent = recipe.ingredients;

        const methodCell = document.createElement("td");
        methodCell.textContent = recipe.method;

        const difficultyCell = document.createElement("td");
        difficultyCell.textContent = recipe.difficulty || "";

        const prepTimeCell = document.createElement("td");
        prepTimeCell.textContent = recipe.prepTime || "";

        const vegetarianCell = document.createElement("td");
        vegetarianCell.textContent = recipe.isVegetarian ? "Yes" : "No";

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
        row.appendChild(difficultyCell);
        row.appendChild(prepTimeCell);
        row.appendChild(vegetarianCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
      }

      message.textContent = "";
    } else {
      console.error("Error loading recipes:", data)
      message.textContent = data.msg || "Failed to load recipes.";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "A communication error occurred.";
  }
};
