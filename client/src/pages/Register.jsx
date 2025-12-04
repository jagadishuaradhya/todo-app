import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    axios
      .post(`${baseURL}/auth/register`, { name, email, password })
      .then(() => {
        alert("Registered Successfully");
        nav("/login");
      })
      .catch(() => alert("Registration Failed"));
  };

  return (
    <div className="auth-container">

      <div className="auth-box">
        <h1>Register</h1>

        <input
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={registerUser}>Register</button>

        <p>Already have an account?
          <span className="auth-link" onClick={() => nav("/login")}>
            Login
          </span>
        </p>
      </div>

    </div>
  );
};

export default Register;
