import { FiUpload, FiMessageCircle } from "react-icons/fi";
import logo from "../assets/logo.png";
import NotificationsDropdown from "./NotificationsDropdown";
import { MdExpandMore } from "react-icons/md";
import Project from "../Services/Project.model";
import { toast } from "react-hot-toast";
import Milestones from "../Services/Milestones.model";
import Student from "../services/Student.model";
import Auth from "../Services/Auth.model"; 
import { useEffect, useState, useRef } from "react";
import "./StudentNavbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import echo from "../echo";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { FaBell, FaCommentDots } from "react-icons/fa";

export const StudentNavbar = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [milestoneId, setMilestoneId] = useState("");
  const location = useLocation();
  
  const isLibraryPage = location.pathname.includes("projectsLiberary");
  const isTeamPage = location.pathname.includes("/inteam/team");
  const isTimelinePage = location.pathname.includes("timeline");
  const isProfilePage = location.pathname.includes("/student/profile");

  // دالة دقيقة للتحقق من اللينك النشط الحالي
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const openNotifRef = useRef(false);
  const { user: currentUser, updateUser } = useAuth();
console.log("currentUser:", currentUser);
  // 💡 Ref لتتبع أحدث قيمة لـ currentUser بشكل لحظي (يحل مشكلة الـ race condition)
  const currentUserRef = useRef(currentUser);
  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  const loadUnreadCount = async () => {
    // 💡 لو المستخدم مش مسجل دخول، متعملش الطلب أصلاً
    if (!currentUserRef.current) return;

    try {
      const res = await Student.getNotifications();

      // 💡 تحقق تاني بعد رجوع الرد، مش بالاعتماد على القيمة القديمة وقت الاستدعاء
      if (!currentUserRef.current) return;

      const unread = res.filter((item) => item.read_at === null).length;
      setUnreadCount(unread);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProfileData = async () => {
    // 💡 شرط أمان: إذا كان الـ currentUser غير موجود (تم تسجيل الخروج)، لا تفعل شيئاً واخرج فوراً
    if (!currentUserRef.current) return;

    try {
      const res = await Auth.getProfileData();

      // 💡 تأكيد إضافي حقيقي (مش عن طريق closure قديم): تحقق أن المستخدم لم يقم بالخروج أثناء فترة انتظار الـ API
      if (!currentUserRef.current) return;

      const profileData = res;

      if (profileData) {
        if (updateUser) {
          updateUser({
            proposal_status: profileData.proposal_status,
            submitted_proposal: profileData.submitted_proposal,
            proposal_accepted: profileData.proposal_accepted,
          });
        }
      }
    } catch (err) {
      console.log("Error fetching profile data:", err);
    }
  };

  useEffect(() => {
    console.log("Echo", echo);
  }, []);

  useEffect(() => {
    loadUnreadCount();
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadUnreadCount();
      loadProfileData();
    } else {
      // 💡 تصفير البيانات تماماً عند عمل Logout
      setUnreadCount(0);
      setMilestones([]);
      setShowPopup(false);
      setFile(null);
      setNotes("");
      setMilestoneId("");
      setOpenNotif(false);
      openNotifRef.current = false;
    }
  }, [currentUser]);

  const handleOpenNotifications = async () => {
    const next = !openNotif;
    setOpenNotif(next);
    openNotifRef.current = next;

    if (next) {
      try {
        await Student.readNotifications();
        setUnreadCount(0);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    echo
      .private(`user.${currentUser.id}`)
      .listen(".new-notification", (event) => {
        console.log("New Notification:", event);
        loadUnreadCount();

        if (openNotifRef.current) {
          window.dispatchEvent(new Event("refresh-notifications"));
        }
      });

    return () => {
      echo.leave(`private-user.${currentUser.id}`);
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      setMilestones([]);
      return;
    }

    const fetchMilestones = async () => {
      try {
        const res = await Milestones.getOpenMilestones();

        // 💡 تحقق أن المستخدم مازال مسجل دخول بعد رجوع الرد
        if (!currentUserRef.current) return;

        const data = Array.isArray(res) ? res : res?.data || [];
        setMilestones(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMilestones();
  }, [currentUser]);

  const openMilestones = milestones?.filter((m) => m.is_open === true) || [];

  // 💡 مصدر واحد فقط للحقيقة: currentUser.proposal_status
  const isProposalApproved = currentUser?.proposal_status === "approved";
  
  const uploadButtonText = isProposalApproved ? "Upload Task" : "Upload Idea";
  const popupTitle = isProposalApproved ? "Upload Task" : "Upload Idea";

  const handleUpload = async () => {
    
    try {
      const formData = new FormData();
      formData.append("milestone_id", milestoneId);
      formData.append("notes", notes);
      if (file) {
        formData.append("files[0]", file);
      }
      const response = await Project.submitTask(formData);
      console.log(response);

      toast.success(
        () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <strong>{popupTitle}</strong>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "green", fontSize: "18px" }}>✔️</span>
              <span>Your submission has been completed successfully</span>
            </div>
          </div>
        ),
        { duration: 3000 }
      );
      setShowPopup(false);
      setFile(null);
      setNotes("");
      setMilestoneId("");
      
      loadProfileData();
    } catch (error) {
      console.log("ERROR CAUGHT:", error);
      toast.error(
        () => (
          <div>
            <strong>Submission Failed</strong>
            <div>{error?.message}</div>
          </div>
        ),
        { duration: 3000 }
      );
    }
  };
console.log("currentUser:", currentUser);
  return (
    <div className="flex items-center student-navbar justify-between px-8 py-3 bg-white ">
      {/* Left */}
      <div className="nav-left">
        <img src={logo} alt="logo" width="60" />
      </div>
      
      {/* Center Links */}
      <div className="nav-center">
        <span
          className={`nav-link ${isActive("/") ? "activ-link" : ""}`}
          onClick={() => navigate("/")}
        >
          Home
        </span>

        <span
          className={`nav-link ${isLibraryPage ? "activ-link" : ""}`}
          onClick={() => navigate("/projectsLiberary")}
        >
          Library
        </span>
        
        {currentUser && (
          <span
            className={`nav-link ${isTeamPage || location.pathname.includes("notinteam") ? "activ-link" : ""}`}
            onClick={() =>
              navigate(
                currentUser?.has_team
                  ? "/inteam/team"
                  : "/student/notinteam/notinteam",
              )
            }
          >
            My Team
          </span>
        )}

        <span
          className={`nav-link ${isTimelinePage ? "activ-link" : ""}`}
          onClick={() =>
            navigate(
              currentUser?.has_team ? "student/inteam/timeline" : "/timeline",
            )
          }
        >
          Timeline
        </span>
      </div>

      {/* Right Controls */}
      <div className="nav-right">
        {isLibraryPage ? (
          currentUser && (
            <button
              className={`favorite-btn-navbar ${location.pathname.includes("favorites") ? "active-fav-btn" : ""}`}
              onClick={() => navigate("/student/inteam/projectsLiberary/favorites")}
            >
              <FaHeart />
              Favorites
            </button>
          )
        ) : isTeamPage ? (
          currentUser && (
            <button
              className="chat-btn-navbar"
              onClick={() => navigate("/student/inteam/chatconversations")}
              aria-label="Conversations"
            >
              <FaCommentDots />
            </button>
          )
        ) : (
          <button
            onClick={() => {
              if (!currentUser) return;
              if (isProposalApproved) {
                setShowPopup(true);
              } else {
                navigate("student/inteam/upload-project-idea");
              }
            }}
            className={`upload-btn ${!currentUser ? "upload-btn-disabled" : ""}`}
            disabled={!currentUser}
          >
            <FiUpload />
            {uploadButtonText}
          </button>
        )}
        
        {showPopup && currentUser && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>{popupTitle}</h2>
              <label>File</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <label>Milestone</label>
              <select
                value={milestoneId}
                onChange={(e) => setMilestoneId(e.target.value)}
              >
                <option value="">Choose milestone</option>
                {openMilestones.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
              <label>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              >
              </textarea>
              <div className="popup-actions">
                <button
                  className="btn-cancel"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button className="btn-submit" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {/* تم تعديل هذا الجزء لإخفاء الجرس تماماً في حال كان المستخدم Guest */}
        {currentUser && (
          <div className="relative">
            <FaBell
              className="text-gray-600 text-lg cursor-pointer"
              onClick={handleOpenNotifications}
            />

            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}

            {openNotif && <NotificationsDropdown />}
          </div>
        )}

        {/* Profile Section */}
        <div
          className={`flex items-center gap-2 cursor-pointer user-profile-container ${isProfilePage ? "profile-active" : ""}`}
          onClick={() => currentUser && navigate("/student/profile")}
        >
                  {!currentUser && (
          <button
            className="nav-login-btn"
            onClick={() => navigate("/login")}
          >
         login
          </button>
        )}
          {currentUser ? (
            <>
              <img
                src="https://i.pravatar.cc/40"
                className={`w-8 h-8 rounded-full ${isProfilePage ? "profile-img-active" : ""}`}
                alt="Profile"
              />
              <span className="text-sm user-profile-name">{currentUser.full_name}</span>
              <MdExpandMore className="expand-icon" />
            </>
          ) : (
            <>
              <FaUserCircle size={32} color="#BDBDBD" />
              <span className="text-sm text-gray-400">Guest</span>
            </>
          )}
        </div>

        {/* زر تسجيل الدخول - يظهر فقط للـ Guest */}

      </div>
    </div>
  );
};