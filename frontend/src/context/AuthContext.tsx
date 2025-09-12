import { Login } from "@/Types";
import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: Login | null;
  setUser: React.Dispatch<React.SetStateAction<Login | null>>;
  getUser: () => Login | null;
  setUserFromStorage: (data: Login) => void;
  handleLogout: () => void;
};

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  getUser: () => null,
  setUserFromStorage: () => {},
  handleLogout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Login | null>(null);
  const navigate = useNavigate();

  function getUser() {
    const getUserData = localStorage.getItem("user");
    return getUserData ? (JSON.parse(getUserData) as Login) : null;
  }

  function setUserFromStorage(data: Login) {
    if (!data) return;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser({ token, user: JSON.parse(userData) });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, getUser, setUserFromStorage, handleLogout }}
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
