import { getInputEnabled, setDiv } from "./index.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

let loginRegisterDiv = null;

export const handleLoginRegister = () => {
  loginRegisterDiv = document.getElementById("login-register-div");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const showLoginBtn = document.getElementById("show-login");
  const showRegisterBtn = document.getElementById("show-register");


showLoginBtn.addEventListener("click", () => {
  loginForm.style.display = "block"
  registerForm.style.display = "none"
})

showRegisterBtn.addEventListener("click", () => {
  loginForm.style.display = "none"
  registerForm.style.display = "block"
})
}
  
export const showLoginRegister = () => {
  setDiv(loginRegisterDiv);
};
