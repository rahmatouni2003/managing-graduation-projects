import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const login = (user) => {
    setIsAuth(true);

    localStorage.setItem("isAuth", "true");
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuth(false);

    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);