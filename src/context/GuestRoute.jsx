import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute({ children }) {
  const { isAuth } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuth) {
    return children;
  }

  if (!user?.has_team) {
    return children;
  }

  return <Navigate to="/" replace />;
}