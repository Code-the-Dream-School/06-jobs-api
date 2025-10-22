import {
  getInputEnabled,
  setInputEnabled,
  setDiv,
  getToken,
  setToken,
  getMessage,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showRecipes } from "./recipes.js";

let loginDiv = null;
let password = null;
let emailInput = null;

export const handleLogin = () => {
  const loginDiv = document.getElementById("login-register-div");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginForm = document.getElementById("login-form");
  const message = document.getElementById("login-message");

if (!loginForm || !emailInput || !passwordInput || !message) {
  console.error("Login elements missing from DOM")
  return;
}

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!getInputEnabled()) return;
    setInputEnabled(false);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.textContent = `Welcome, ${data.user.email || "User" }!`;
        setToken(data.token);
        showRecipes();
      } else {
        message.textContent = data.msg || "Login failed.";
      }
    } catch (err) {
      console.error(err);
      message.textContent = "A network or server error occurred.";
    }
    setInputEnabled(true);
  });
};

export const showLogin = () => {
  const emailInput = document.getElementById("email");
  const passWordInput = document.getElementById("password");
 
  if (emailInput) emailInput.value = "";
  if (passwordInput) passwordInput.value = "";
  
  const loginDiv = document.getElementById("login-register-div");
  setDiv(loginDiv);
};
