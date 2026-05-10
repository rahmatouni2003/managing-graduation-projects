import { FaSearch, FaRegFileAlt, FaBookOpen, FaUserFriends } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdErrorOutline, MdExpandMore } from "react-icons/md";
import { useState } from "react";
import { StudentNavbar } from "../Components/StudentNavbar";
import landing from "../assets/homee2.jpg";
function Home() {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-[#E9E9E9] min-h-screen">
      <StudentNavbar />

      <div className="max-w-[1200px] mx-auto p-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden h-64 rounded-sm shadow-sm">
          <img
            src={landing}
            alt="Landing"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative flex flex-col items-center justify-center h-full px-4">
            <h2 className="text-3xl font-bold mb-6 text-white">Welcome Aliya 👋🏻</h2>

            <div className="flex items-center bg-white rounded-md px-4 py-2 max-w-[550px] w-fit mx-auto shadow-sm">
              <FaSearch className="text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search Projects or Students"
                className="ml-3 w-full outline-none border-0 text-black  focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Project Section Wrapper */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-[#333]">Project</h3>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </p>

{/* Header فقط */}
<div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">

  {/* Header */}
  <div
    className={`flex items-center justify-between p-5 cursor-pointer transition-all duration-200 ${
      open ? "border-b border-gray-200" : "border-b-0"
    }`}
    onClick={() => setOpen(!open)}
  >
    <div className="flex items-center gap-3">
      <FaRegFileAlt className="text-blue-600 text-xl" />

      <h4 className="font-bold text-gray-800 text-lg">
        Project Guidelines
      </h4>
    </div>

    <MdExpandMore
      className={`text-2xl text-gray-400 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    />
  </div>

  {/* Content (بيختفي تمامًا وماياخدش مساحة) */}
  {open && (
    <div className="bg-white p-6 border-t border-gray-100">
      <ul className="list-disc pl-8 space-y-3 text-sm font-medium text-[#555] marker:text-blue-600">
        <li>The idea should be original and innovative.</li>
        <li>The project must address a real-world problem.</li>
        <li>Project ideas from previous years cannot be repeated.</li>
        <li>Minimum Team size is 4 members and maximum is 6.</li>
        <li>Supervisor Evaluation: 40 marks</li>
        <li>Every Final Discussion: 10 marks</li>
      </ul>
    </div>
  )}
</div>

          {/* Deadline Alert */}
<div className="mt-6 w-fit bg-red-500 text-white px-5 py-3 rounded-lg inline-flex items-center gap-3 shadow-md">
  <MdErrorOutline className="text-2xl" />
  
  <span className="font-semibold text-sm uppercase tracking-wide">
    Next deadline in 3 days
  </span>
</div>

          {/* Bottom Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {/* Card 1: Last Feedback */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-between min-h-[170px]">
              <div>
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <FaBookOpen />
                  <span className="font-bold text-sm">Last Feedback</span>
                </div>
                <div className="bg-gray-100 p-3 rounded text-[11px] text-gray-600 border-l-4 border-gray-300 leading-relaxed italic">
                  "Excellent work on the design system. The color palette is cohesive and ..."
                </div>
              </div>
              <div className="flex justify-between mt-4 text-[9px] text-gray-400 pt-2  border-gray-50">
                <span>Created by:<br/><b className="text-gray-600">Ahmed El-Naggar</b></span>
                <span className="text-right">November 15,<br/>2025</span>
              </div>
            </div>

            {/* Card 2: Important Notes */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-between min-h-[170px]">
              <div>
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <HiOutlineSpeakerphone className="text-lg" />
                  <span className="font-bold text-sm">Important Notes</span>
                </div>
                <ul className="text-[11px] text-gray-600 space-y-1 font-medium">
                  <li>• Discussion will be in hall 3</li>
                  <li>• Lorem ipsum</li>
                </ul>
              </div>
              <div className="flex justify-between mt-4 text-[9px] text-gray-400 pt-2  border-gray-50">
                <span>Posted by:<br/><b className="text-gray-600">Ahmed El-Naggar</b></span>
                <span className="text-right">November 20,<br/>2025</span>
              </div>
            </div>

            {/* Card 3: Supervisors */}
            <div className="bg-white p-4 rounded-xl shadow-sm min-h-[170px]">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <FaUserFriends />
                <span className="font-bold text-sm">Supervisors</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <img src="https://i.pravatar.cc/30?u=1" className="rounded-full w-6 h-6" alt="A. Naggar" />
                  <span className="text-[11px] font-bold text-gray-700">Ahmed El-Naggar</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="https://i.pravatar.cc/30?u=2" className="rounded-full w-6 h-6" alt="A. Fayez" />
                  <span className="text-[11px] font-bold text-gray-700">Ahmed Fayez</span>
                </div>
              </div>
            </div>

            {/* Card 4: Supervising Committee */}
            <div className="bg-white p-4 rounded-xl shadow-sm min-h-[170px]">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <FaUserFriends />
                <span className="font-bold text-sm">Supervising Committee</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <img src="https://i.pravatar.cc/30?u=3" className="rounded-full w-6 h-6" alt="K. Kassem" />
                  <span className="text-[11px] font-bold text-gray-700">Khaled Kassem</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="https://i.pravatar.cc/30?u=4" className="rounded-full w-6 h-6" alt="M. Emad" />
                  <span className="text-[11px] font-bold text-gray-700">Mariam Emad</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="https://i.pravatar.cc/30?u=5" className="rounded-full w-6 h-6" alt="K. Yaqoub" />
                  <span className="text-[11px] font-bold text-gray-700">Kharoub Yaqoub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;