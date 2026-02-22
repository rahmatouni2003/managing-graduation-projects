import logo from "../assets/logo2.png";
import { useState } from "react";
import { FaRegBell, FaUserCircle, FaBars, FaSearch } from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";
function Header() {
  const [open, setOpen] = useState(false);
  const { profileImage } = useProfile();
  return (
    <div>
      <nav className="bg-[#243B56]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-14 w-auto" />
            </div>
            <div className="hidden md:flex flex-1 justify-center px-6">
              <div className="relative w-full max-w-md">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects or students..."
                  className="w-full rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="relative cursor-pointer">
                <FaRegBell className="text-xl text-white hover:text-gray-300 transition" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
              </div>
              {profileImage ? (
                <img
                  src={profileImage}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-3xl" />
              )}
              <button
                className="md:hidden text-xl"
                onClick={() => setOpen(!open)}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
        {open && (
          <div className="md:hidden bg-[#243B56] px-4 pb-4 space-y-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects or students..."
                className="w-full rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 text-white pt-2">
              <FaUserCircle className="text-3xl" />
              <span>My Profile</span>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
