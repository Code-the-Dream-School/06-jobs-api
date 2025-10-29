import {
  getInputEnabled,
  setInputEnabled,
  setToken,
} from "./index.js";
import { showRecipes } from "./recipes.js";



export const handleLogin = () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const message = document.getElementById("login-message");

if (!loginForm || !emailInput || !passwordInput || !message) {
  console.error("Login elements missing from DOM")
  return;
}

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!getInputEnabled()) return;
    setInputEnabled(false);

    message.textContent = "";

    const email = emailInput.value.trim()
    const password = passwordInput.value

    if (!email || !password) {
      message.textContent = "Email and password are required.";
      setInputEnabled(true)
      return;
    }

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, password
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        message.textContent = `Welcome, ${data.user.email || "User" }!`;
       emailInput.value="";
       passwordInput.value = "";
        showRecipes();
      } else {
        message.textContent = data.msg || "Login failed.";
      }
    } catch (err) {
      console.error("Login error:", err);
      message.textContent = "A network or server error occurred.";
    } finally {
    setInputEnabled(true);
    }
  });
};

export const showLogin = () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
 
  if (emailInput) emailInput.value = "";
  if (passwordInput) passwordInput.value = "";
  
  
};
