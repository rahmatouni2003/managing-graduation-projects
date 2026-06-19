import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuth } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  if (user?.role_code !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}