import { useState, useEffect, useRef } from "react";
import "./EditProfile.css";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import StudentSidebar from '../Components/StudentSidebar';
import Auth from "../Services/Auth.model"; 
import Project from "../Services/Project.model"; 
import toast from "react-hot-toast";
export default function EditProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null); 

  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    track_name: "",
    department_id: "",
    email: "",
    phone: "",
    password: "",
    profile_image_url: null,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await Project.getDepartments();
      setDepartments(response || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await Auth.getProfileData();
      if (response?.status && response?.data) {
        const user = response.data;
        setFormData({
          full_name: user.full_name || "",
          track_name: user.track_name || "",
          department_id: user.department_id || "", // تم تعديلها لتتوافق مع الموديل
          email: user.email || "",
          phone: user.phone || "",
          password: "●●●●●●●●",
          profile_image_url: user.profile_image_url || "https://via.placeholder.com/150",
          imageFile: null,
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCameraClick = () => {
    fileInputRef.current.click(); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        profile_image_url: URL.createObjectURL(file) 
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const loadingToast = toast.loading("Saving...");

  try {
    const updatedData = {
      full_name: formData.full_name,
      track_name: formData.track_name,
      department_id: formData.department_id,
      email: formData.email,
      phone: formData.phone,
    };

const response = await Auth.updateProfile(updatedData);

console.log("UPDATE RESPONSE:", response);

if (response?.id) {
  toast.success(response?.message || "Profile updated successfully 🎉", {
    id: loadingToast,
  });
} else {
  toast.error("Failed to update profile ❌", {
    id: loadingToast,
  });
}
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong ❌", {
      id: loadingToast,
    });
  }
};

  if (loading) {
    return <div className="loading">Loading Profile Data...</div>;
  }

  return (
    <div className="edit-profile-container">
      <StudentSidebar />
      
      <div className="edit-profile-content">
        <div className="profile-header">
          <div className="avatar-container" style={{ position: 'relative' }}>
            <img 
              src={formData.profile_image_url} 
              className="profile-avatar" 
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div className="camera-btn" onClick={handleCameraClick} style={{ cursor: 'pointer' }}>
              <FaCamera />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </div>
          <h1>Edit Profile</h1>
        </div>

   

        <form className="profile-form" onSubmit={handleSubmit}>
          
          {/* الحقل 1: الاسم الكامل (تمت إضافته بناءً على الـ State) */}
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="full_name" 
              value={formData.full_name} 
              onChange={handleChange} 
            />
          </div>

          {/* الحقل 2: القسم */}
          <div className="form-group">
            <label>Department</label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {/* الحقل 3: المسار */}
          <div className="form-group">
            <label>Track</label>
            <input 
              type="text" 
              name="track_name" 
              value={formData.track_name} 
              onChange={handleChange} 
            />
          </div>

          {/* الحقل 4: الإيميل الجامعي */}
          <div className="form-group">
            <label>University Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* الحقل 5: رقم الهاتف */}
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>

          {/* الحقل 6: كلمة المرور */}
          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* زر الحفظ ممتد في الأسفل لوحده */}
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
}