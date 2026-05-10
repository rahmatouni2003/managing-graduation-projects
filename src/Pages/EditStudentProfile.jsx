
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";
import { FaUserCircle } from "react-icons/fa";
// import ProfileSidebar from "../components/ProfileSidebar";

export default function EditProfile() {
  const navigate = useNavigate();

  const { profileImage, saveProfileImage } = useProfile();

  const [previewImage, setPreviewImage] = useState(profileImage);

  const [formData, setFormData] = useState({
    name: "",
    faculty: "Computer and Artificial Intelligence",
    track: "AI",
    department: "CS",
    universityEmail: "",
    city: "BeniSuef",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    saveProfileImage(previewImage);

    navigate("/doctor");
  };
  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar */}
    

      {/* Main */}
      <div className="flex-1 flex flex-col ">
       

        <div className="">
          {/* Header Section */}
          <div className=" p-3 mb-1 flex items-center gap-6">
            {/* Profile Image */}
            <label className="relative cursor-pointer">
              {previewImage ? (
                <img
                  src={previewImage}
                  className="w-32 h-32 rounded-full object-cover "
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-black  flex items-center justify-center">
                  <FaUserCircle className="text-white text-5xl" />
                </div>
              )}

              <div className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full">
                <FaCamera />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Title */}
            <h1 className="text-3xl font-bold text-blue-600">Edit Profile</h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className=" p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Name */}
            <div>
              <label className="block  mb-2 font-medium">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full  bg-white  rounded-md px-4 py-2"
              />
            </div>

            {/* Faculty */}
            <div>
              <label className="block mb-2 font-medium">Faculty</label>
              <select
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full border-0 rounded-md px-4 py-2"
              >
                <option>Computer and Artificial Intelligence</option>
                <option>Engineering</option>
                <option>Science</option>
              </select>
            </div>

            {/* Track */}
            <div>
              <label className="block mb-2 font-medium">Track</label>
              <select
                name="track"
                value={formData.track}
                onChange={handleChange}
                className="w-full  border-0  rounded-md px-4 py-2"
              >
                <option>AI</option>
                <option>Data Science</option>
                <option>Software Engineering</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block mb-2 font-medium">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full  border-0 rounded-md px-4 py-2"
              >
                <option>CS</option>
                <option>IT</option>
              </select>
            </div>

            {/* University Email */}
            <div>
              <label className="block mb-2 font-medium">University Email</label>
              <input
                type="email"
                name="universityEmail"
                value={formData.universityEmail}
                onChange={handleChange}
                className="w-full border-0 rounded-md px-4 py-2"
              />
            </div>

            {/* City */}
            <div>
              <label className="block mb-2 font-medium">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border-0 rounded-md px-4 py-2"
              >
                <option>BeniSuef</option>
                <option>Cairo</option>
                <option>Giza</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-0 bg-white  rounded-md px-4 py-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full  bg-white  rounded-md px-4 py-2"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-0  bg-white rounded-md px-4 py-2"
              />
            </div>

            {/* Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-16 py-4 rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}
