import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import DOMAIN from "../../utils/backend-Domain";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const user = await axios.post(`${DOMAIN}/users/login`, { email, password });

    localStorage.setItem("token", user.data.token);

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to={"/sign-up"}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
