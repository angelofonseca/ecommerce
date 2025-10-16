import { AuthContextType, Login } from "@/Types";
import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType>({
  login: null,
  setLogin: () => {},
  getUser: () => null,
  setLocalLogin: () => {},
  handleLogout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [login, setLogin] = useState<Login | null>(null);
  const navigate = useNavigate();

  function getUser() {
    const getUserData = localStorage.getItem("login");
    return getUserData ? (JSON.parse(getUserData) as Login) : null;
  }

  function setLocalLogin(data: Login) {
    if (!data) return;
    localStorage.setItem("login", JSON.stringify(data));
    setLogin(data);
  }

  function handleLogout() {
    localStorage.removeItem("login");
    setLogin(null);
    navigate("/");
  }

  useEffect(() => {
    const loginData = localStorage.getItem("login");
    if (loginData) {
      setLogin(JSON.parse(loginData) as Login);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
        getUser,
        setLocalLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
