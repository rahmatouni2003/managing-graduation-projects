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
    profile_image_url: "https://via.placeholder.com/150", // قيمة افتراضية أولية
    imageFile: null,
  });

  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    try {
      const response = await Project.getDepartments();
      setDepartments(response || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await Auth.getProfileData();
      console.log("Profile API raw response:", response); // 👈 شيليها بعد ما تتأكدي من الشكل

      // بنتعامل مع أكتر من شكل محتمل للـ response:
      // 1) { status: true, data: {...} }  <-- الشكل اللي بعتيه
      // 2) { data: {...} }                <-- لو الـ Auth.model عمل return response.data
      // 3) {...} مباشرة                    <-- لو الـ Auth.model عمل return response.data.data
      const user =
        response?.data?.id !== undefined
          ? response.data
          : response?.id !== undefined
          ? response
          : null;

      if (user) {
        setFormData({
          full_name: user.full_name || "",
          track_name: user.track_name || "",
          // تحويل الـ id إلى String لأن الـ <select> يتعامل مع القيم كنصوص لضمان التحديد الصحيح
          department_id: user.department_id !== null && user.department_id !== undefined ? String(user.department_id) : "",
          email: user.email || "",
          phone: user.phone || "",
          password: "", // يُفضل تركه فارغاً حتى لا يرسل نقاط التشفير للسيرفر عند التعديل
          profile_image_url: user.profile_image_url || "https://via.placeholder.com/150",
          imageFile: null,
        });
      } else {
        console.warn("Unexpected profile response shape:", response);
        toast.error("Unexpected server response ❌");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // جلب الأقسام أولاً ثم جلب بيانات المستخدم لضمان ربط الـ department_id بشكل صحيح
    const initData = async () => {
      await fetchDepartments();
      await fetchProfile();
    };
    initData();
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
        department_id: formData.department_id || null, // إذا كان فارغاً نرسله null
        email: formData.email,
        phone: formData.phone,
      };

      // إذا قام المستخدم بكتابة باسوورد جديدة فقط نقوم بإرسالها
      if (formData.password && formData.password !== "●●●●●●●●") {
        updatedData.password = formData.password;
      }

      const response = await Auth.updateProfile(updatedData);

      if (response?.id || response?.status) {
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
              alt="Profile"
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
          
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="full_name" 
              value={formData.full_name} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                // تحويل id القسم أيضاً إلى String للمقارنة المتطابقة
                <option key={department.id} value={String(department.id)}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Track</label>
            <input 
              type="text" 
              name="track_name" 
              value={formData.track_name} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>University Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group password-group">
            <label>Password (Leave blank if unchanged)</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
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

          <button type="submit" className="save-button">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
