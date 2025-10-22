// imports
import { showRecipes, handleRecipes } from "./recipes.js";
import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { handleLogin } from "./login.js";
import { handleAddEdit } from "./addEdit.js";
import { handleRegister } from "./register.js";

let activeDiv = null;

// Token management - use localStorage only for persistence
export let _token = null;

export const getToken = () => _token;

export const setToken = (value) => {
  _token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export const setDiv = (divToShow) => {
  const divs = [
    document.getElementById("login-register-div"),
    document.getElementById("recipes-div"),
    document.getElementById("edit-recipe"),
  ];

  divs.forEach((div) => {
    if (!div) return;
    if (div === divToShow) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  });
  activeDiv = divToShow;
};

//input control
let _inputEnabled = true;
export const getInputEnabled = () => _inputEnabled;
export const setInputEnabled = (state) => {
  _inputEnabled = state;
};

// msg element
let _message = null;
export const getMessage = () => _message;
export const setMessage = (msgE1) => {
  _message = msgE1;
};

// initialize
document.addEventListener("DOMContentLoaded", () => {
  setToken(localStorage.getItem("token")); // load token from localStorage
  setMessage(document.getElementById("login-message"));
  handleLoginRegister();
  handleLogin();
  handleRecipes();
  handleRegister();
  handleAddEdit();

  if (getToken()) {
    showRecipes();
  } else {
    showLoginRegister();
    document.getElementById("login-form").style.display = "block";
  }
});
