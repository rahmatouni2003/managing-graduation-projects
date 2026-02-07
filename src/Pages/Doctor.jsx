import Navbar from "../Components/Header";
import Sidebar from "../Components/SideBar";
import { Outlet } from "react-router-dom";
export default function Doctor() {
  return (
    <div className="flex h-screen">
      <Sidebar /> 
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
