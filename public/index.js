let activeDiv = null;
export const setDiv = (newDiv) => {
  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

//input control
let _inputEnabled = true;
export const getInputEnabled = () => _inputEnabled;
export const setInputEnabled = (state) => {
  _inputEnabled = state;
};

// token mgmt
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


// msg element
let _message = null;
export const getMessage = () => _message
export const setMessage = (msgE1) => {
  _message = msgE1;
}

// imports 
import { showRecipes, handleRecipes } from "./recipes.js";
import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { handleLogin } from "./login.js";
import { handleAddEdit } from "./addEdit.js";
import { handleRegister } from "./register.js";

// initialize
document.addEventListener("DOMContentLoaded", () => {
  setToken = localStorage.getItem("token");
  setMessage(document.getElementById("message"));
  handleLoginRegister();
  handleLogin();
  handleRecipes();
  handleRegister();
  handleAddEdit();
  if (getToken) {
    showRecipes();
  } else {
    showLoginRegister();
  }
});