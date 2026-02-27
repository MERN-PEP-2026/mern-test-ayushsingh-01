import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem("student");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (authResponse) => {
    setToken(authResponse.token);
    setStudent(authResponse.student);
    localStorage.setItem("token", authResponse.token);
    localStorage.setItem("student", JSON.stringify(authResponse.student));
  };

  const logout = () => {
    setToken(null);
    setStudent(null);
    localStorage.removeItem("token");
    localStorage.removeItem("student");
  };

  const value = useMemo(
    () => ({ token, student, login, logout }),
    [token, student]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
