// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    setIsAuth(true);
    setUser(userData);
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

const logout = () => {
  setIsAuth(false);
  setUser(null);
  
  // 1. مسح كل المفاتيح المتعلقة بالمصادقة
  localStorage.removeItem("isAuth");
  localStorage.removeItem("user");
  localStorage.removeItem("token"); // 👈 امسحي اسم المفتاح الخاص بالـ Token هنا إذا كان موجوداً

  // 2. إذا كنتِ تستخدمين Axios، يجب حذف الـ Header الافتراضي فوراً
  // import axios from "axios";
  // delete axios.defaults.headers.common["Authorization"];
};

  const updateUser = (partialData) => {
    setUser((prev) => {
      const updated = { ...prev, ...partialData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
