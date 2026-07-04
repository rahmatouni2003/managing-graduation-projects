import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function StudentRoute({ children, teamStatus = null }) {
  const { isAuth } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

 
  if (user?.role_code !== "Student") {
    return <Navigate to="/" replace />;
  }


  if (teamStatus === "has-team" && !user?.has_team) {
    return <Navigate to="/student/notinteam/notinteam" replace />; 
  }

  if (teamStatus === "no-team" && user?.has_team) {
    return <Navigate to="/inteam/team" replace />; 
  }

  return children;
}