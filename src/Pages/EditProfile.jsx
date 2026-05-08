// pages/EditProfile.jsx
import {  useState } from "react";
import { Camera, Eye, EyeOff } from "lucide-react";
import ProfileSidebar from "../Components/StudentSidebar";
import Auth from "../Services/Auth.model";
import toast from "react-hot-toast";
import "./EditProfile.css";
export default function EditProfile() {
  const [showPassword, setShowPassword] = useState(false);


const user = JSON.parse(localStorage.getItem("user"));

const [formData, setFormData] = useState({
  full_name: user?.full_name || "",
  email: user?.email || "",
  phone: user?.phone || "",
  track_name: user?.track_name || "",
  department_id: user?.department_id || "",
  profile_image_url: user?.profile_image_url || "",
  password: "",
});

const [preview, setPreview] = useState(
  user?.profile_image_url || ""
);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);

      setPreview(imageURL);

      setFormData({
        ...formData,
        profile_image_url: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("full_name", formData.full_name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("track_name", formData.track_name);
      data.append("department_id", formData.department_id);
      data.append("password", formData.password);

      if (formData.profile_image_url) {
        data.append(
          "profile_image_url",
          formData.profile_image_url
        );
      }

      const response = await Auth.updateProfile(data);

      toast.success("Profile Updated Successfully");

      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex bg-[#ECECEC] min-h-screen">
      <ProfileSidebar />

   <div className="editContainer flex-1 px-24 py-10">
        <div className="max-w-5xl ">
          {/* HEADER */}
          <div className="flex items-center gap-6 mb-10">
<div className="profile-image-container">
  <img
    src={
      preview ||
      "https://i.pravatar.cc/150?img=32"
    }
    alt="profile"
    className="profile-image"
  />

  <label className="camera-icon">
    <Camera size={16} color="white" />

    <input
      type="file"
      hidden
      onChange={handleImage}
    />
  </label>
</div>

            <h1 className="text-[48px] font-bold text-[#0D5BD7]">
              Edit Profile
            </h1>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-6">
              {/* Name */}
              <div>
                <label className="font-semibold block mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 outline-none"
                />
              </div>

              {/* Track */}
              <div>
                <label className="font-semibold block mb-2">
                  Track
                </label>

                <input
                  type="text"
                  name="track_name"
                  value={formData.track_name}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 outline-none"
                />
              </div>

              {/* Department */}
              <div>
                <label className="font-semibold block mb-2">
                  Department
                </label>

                <select
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 outline-none"
                >
                  <option value="">Select</option>
                  <option value="1">IS</option>
                  <option value="2">CS</option>
                  <option value="3">AI</option>
                  <option value="4">IT</option>
                </select>
              </div>

              {/* GPA */}
              <div>
                <label className="font-semibold block mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-semibold block mb-2">
                  University Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 outline-none"
                />
              </div>


            </div>

            {/* BUTTON */}
            <div className="mt-14 flex justify-center">
              <button
                type="submit"
                className="bg-[#0D5BD7] hover:bg-[#004ec4] transition-all text-white font-semibold px-16 py-3 rounded-md"
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