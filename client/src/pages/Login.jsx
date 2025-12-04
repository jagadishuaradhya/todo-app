import React, { useState, useContext } from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { AuthContext } from "../context/AuthContext";

const Login = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    axios
      .post(`${baseURL}/auth/login`, { email, password })
      .then(res => {
        login(res.data.token);
        navigate("/todo");
      })
      .catch(() => alert("Invalid login"));
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
