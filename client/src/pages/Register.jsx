import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";

const Register = ({ navigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    axios
      .post(`${baseURL}/auth/register`, { name, email, password })
      .then(() => {
        alert("Registered Successfully");
        navigate("/login");
      })
      .catch(() => alert("Registration failed"));
  };

  return (
    <div className="register-page">
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default Register;
