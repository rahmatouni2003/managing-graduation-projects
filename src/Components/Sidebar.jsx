import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiOutlineFilter } from "react-icons/ai";
import { FaUsers, FaRegCalendarAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FiFolder } from "react-icons/fi";
export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#243B56] text-white py-8">
      <nav className="flex flex-col gap-1 px-3">
        <SidebarItem
          to="/"
          icon={<MdDashboard />}
          label="Dashboard"
        />
        <SidebarItem
          to="/ai-filter"
          icon={<AiOutlineFilter />}
          label="AI Filter"
        />
        <SidebarItem
          to="/projects"
          icon={<FaUsers />}
          label="Projects & Teams"
        />
        <SidebarItem
          to="/chat"
          icon={<BsChatDots />}
          label="Community Chat"
        />
        <SidebarItem
          to="/milestones"
          icon={<FaRegCalendarAlt />}
          label="Milestones"
        />
        <SidebarItem
          to="/join-requests"
          icon={<HiOutlineUserAdd />}
          label="Join Requests"
        />
        <SidebarItem
          to="/library"
          icon={<FiFolder />}
          label="Library"
        />
      </nav>
    </aside>
  );
}
function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-left transition
         hover:bg-[#1d2f44]
         ${isActive ? "bg-[#1d2f44] font-semibold" : ""}`
      }
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
