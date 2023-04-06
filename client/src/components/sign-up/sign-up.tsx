import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DOMAIN from "../../utils/backend-Domain";
import axios from "axios";
import "./sign-up.css";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    const user = await axios.post(`${DOMAIN}/users/sign-up`, {
      name,
      email,
      password,
    });

    localStorage.setItem("token", user.data.token);

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to={"/login"}>Log in here</Link>
      </p>
    </div>
  );
}

export default SignUpForm;
