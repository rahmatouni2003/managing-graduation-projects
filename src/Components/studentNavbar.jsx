import { FaBell } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import logo from "../assets/logo.png";
import NotificationsDropdown from "./NotificationsDropdown";
import { MdExpandMore } from "react-icons/md";
import { useState } from "react";
export const Navbar = () => {
  const [openNotif, setOpenNotif] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex items-center justify-between px-8 py-3 bg-white ">
      {/* Left */}
      <div className="flex items-center gap-10">
 <img src={logo} alt="Logo" className="h-14 w-auto" />
        <div className="flex gap-6 text-gray-600 font-medium">
          <span className="text-blue-600 border-b-2 border-blue-600 pb-1">
            Home
          </span>
          <span className="cursor-pointer">Library</span>
          <span className="cursor-pointer">My Team</span>
          <span className="cursor-pointer">Timeline</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setShowPopup(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          <FiUpload /> Upload Task
        </button>

        {showPopup && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[350px] shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Upload Task</h2>

              <div className="mb-3">
                <label className="font-semibold block mb-1 text-[#5A5959] ">File</label>

                <input type="file" className="w-full  p-2 rounded border border-[#D9D9D9]" />
              </div>

              <div className="mb-3">
                <label className="font-semibold block mb-1 text-[#5A5959] ">Milestone</label>
                <select className="w-full p-2 rounded border border-[#D9D9D9]">
                  <option>Choose milestone</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="font-semibold block mb-1 text-[#5A5959] ">Notes</label>
                <textarea
                  className="w-full  p-2 rounded border border-[#D9D9D9]"
                  placeholder="Add any brief notes here"
                  
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="relative">
          <FaBell
            className="text-gray-600 text-lg cursor-pointer"
            onClick={() => setOpenNotif(!openNotif)}
          />

          {openNotif && <NotificationsDropdown />}
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">Aliya Othman</span>
          <MdExpandMore />
        </div>
      </div>
    </div>
  );
};