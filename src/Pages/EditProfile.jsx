import Header from "../Components/Header"; // عدلي المسار حسب مكان ملفك
import Sidebar from "../Components/Sidebar";
import { useState } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "Ahmed Khaled Yasser",
    faculty: "Computer and Artificial Intelligence",
    track: "AI",
    department: "CS",
    universityEmail: "AhmedKhaled1240@fcis.bsu.eg",
    city: "BeniSuef",
    phone: "01223479790",
    email: "ahmedkhaled@gmail.com",
    password: "********",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated data:", formData);
    alert("Profile Updated!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Form */}
        <div className="p-6 flex-1 overflow-auto">
          <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Faculty */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Faculty
              </label>
              <select
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Computer and Artificial Intelligence</option>
                <option>Engineering</option>
                <option>Science</option>
              </select>
            </div>

            {/* Track */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Track
              </label>
              <select
                name="track"
                value={formData.track}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>AI</option>
                <option>Data Science</option>
                <option>Software Engineering</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>CS</option>
                <option>IT</option>
              </select>
            </div>

            {/* University Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                University Email
              </label>
              <input
                type="email"
                name="universityEmail"
                value={formData.universityEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>BeniSuef</option>
                <option>Cairo</option>
                <option>Giza</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Save Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
