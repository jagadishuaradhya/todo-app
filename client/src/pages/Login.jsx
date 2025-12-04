import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    axios
      .post(`${baseURL}/auth/login`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        nav("/todo");
      })
      .catch(() => alert("Invalid Login"));
  };

  return (
    <div className="auth-container">

      <div className="auth-box">
        <h1>Login</h1>

        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={loginUser}>Login</button>

        <p>Don't have an account?
          <span className="auth-link" onClick={() => nav("/register")}>
            Register
          </span>
        </p>
      </div>

    </div>
  );
};

export default Login;
