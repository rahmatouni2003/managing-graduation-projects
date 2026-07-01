import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function StudentRoute({ children, requireTeam = false }) {
  const { isAuth } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role_code !== "Student") {
    return <Navigate to="/" replace />;
  }

  if (requireTeam && !user?.has_team) {
    return <Navigate to="/" replace />;
  }

  return children;
}