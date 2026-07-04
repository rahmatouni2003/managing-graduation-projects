import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
  FileText,
  Flag,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import "./ProfileSidebar.css";

export default function ProfileSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Edit Profile",
      icon: <User size={18} />,
      path: "/student/profile",
    },
    {
      title: "Terms & Policies",
      icon: <FileText size={18} />,
      path: "/policies",
    },
    {
      title: "Report a Problem",
      icon: <Flag size={18} />,
      path: "/student/inteam/report-problem",
    },
  ];

  const handleLogout = () => {
    logout();           
    navigate("/login"); 
  };

  return (
    <div className="sidebar">

      <div className="sidebar-links">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {item.icon}
            <span className="sidebar-text">
              {item.title}
            </span>
          </NavLink>
        ))}
      </div>

      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>

    </div>
  );
}