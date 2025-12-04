import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const existingToken = localStorage.getItem("token");
  const [token, setToken] = useState(existingToken);

  const login = (t) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
