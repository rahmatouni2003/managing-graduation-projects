import {
  MdDashboard
} from "react-icons/md";
import { AiOutlineFilter } from "react-icons/ai";
import { FaUsers,FaRegCalendarAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FiFolder } from "react-icons/fi";
export default function Sidebar() {
  return (
    <aside className="w-54 min-h-screen bg-[#243B56] text-white  py-8">


      <nav className="flex flex-col gap-1 px-3">

        <SidebarItem icon={<MdDashboard />} label="Dashboard" />
        <SidebarItem icon={<AiOutlineFilter />} label="AI Filter" />
        <SidebarItem icon={<FaUsers />} label="Projects & Teams" />
        <SidebarItem icon={<BsChatDots />} label="Community Chat" />
        <SidebarItem icon={<FaRegCalendarAlt />} label="Milestones" />
        <SidebarItem icon={<HiOutlineUserAdd />} label="Join Requests" />
        <SidebarItem icon={<FiFolder />} label="Library" />

      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-[#1d2f44] transition">
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
