import {
  getInputEnabled,
  setDiv,
  getMessage,
  setInputEnabled,
  setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showRecipes } from "./recipes.js";

let emailInput = null;
let registerForm = null;
let passwordInput1 = null;
let passwordInput2 = null;

export const handleRegister = () => {
  const registerForm = document.getElementById("register-form");
  const emailInput = document.getElementById("register-email");
  const passwordInput1 = document.getElementById("register-password");
  const passwordInput2 = document.getElementById("register-password2");
  const registerCancel = document.getElementById("register-cancel");

  if (!registerForm || !emailInput || !passwordInput1 || !passwordInput2) {
    console.error("One or more form elements not found.");
    return;
  }

  // Handle form submission
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = getMessage();

    if (!getInputEnabled()) return;

    if (passwordInput1.value !== passwordInput2.value) {
      message.textContent = "The passwords entered do not match.";
      return;
    }
    setInputEnabled(false);

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput1.value,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        message.textContent = `Registration successful.  Welcome ${data.user.name}`;
        setToken(data.token);

        clearForm();
        showRecipes();
      } else {
        message.textContent = data.msg || "Regisration failed.";
      }
    } catch (err) {
      console.error(err);
      message.textContent = "A communication error occurred.";
    } finally {
      setInputEnabled(true);
    }
  });

  // Handle cancel button
  registerCancel.addEventListener("click", () => {
    clearForm();
    showLoginRegister();
  });


  // Help function
  function clearForm() {
    emailInput.value=""
    passwordInput1.value=""
    passwordInput2.value=""
  }
};

export const showRegister = () => {
  const loginRegisterDiv = document.getElementById("login-register-div");
  setDiv(loginRegisterDiv);
  document.getElementById("register-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
};
