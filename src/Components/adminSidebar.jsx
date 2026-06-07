import "./adminSidebar.css";
import {
  FaUsers,
  FaClipboardList,
  FaFilter,
  FaFlag,
  FaLightbulb,
  FaUserFriends,
  FaFileAlt,
  FaUserTie
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <nav>
        <a className="active">
          <FaUsers />
          <span>Management</span>
        </a>

        <a>
          <FaClipboardList />
          <span>Rules</span>
        </a>

        <a>
          <FaFilter />
          <span>AI Filter</span>
        </a>

        <a>
          <FaFlag />
          <span>Milestones Setup</span>
        </a>

        <a>
          <FaLightbulb />
          <span>Suggestions Projects</span>
        </a>

        <a>
          <FaUserFriends />
          <span>Teams</span>
        </a>

        <a>
          <FaFileAlt />
          <span>Final discussions</span>
        </a>

        <a>
          <FaUserTie />
          <span>Milestone Committee</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;