import { FaBell } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import logo from "../assets/logo.png";
import NotificationsDropdown from "./NotificationsDropdown";
import { MdExpandMore } from "react-icons/md";
import Project from "../Services/Project.model";
import { toast } from "react-hot-toast";
import Milestones from "../Services/Milestones.model";
import Student from "../services/Student.model";
import { useEffect, useState, useRef } from "react";
import "./StudentNavbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import echo from "../echo";
import { FaUserCircle } from "react-icons/fa";

export const StudentNavbar = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [milestoneId, setMilestoneId] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const isLibraryPage = location.pathname.includes("projectsLiberary");
  const isActive = (path) => location.pathname === path;
  const openNotifRef = useRef(false);
  const loadUnreadCount = async () => {
    try {
      const res = await Student.getNotifications();

      const unread = res.filter((item) => item.read_at === null).length;

      setUnreadCount(unread);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("Echo", echo);
  }, []);
  useEffect(() => {
    loadUnreadCount();
  }, []);
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
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);
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
    const fetchMilestones = async () => {
      try {
        const res = await Milestones.getOpenMilestones();
        const data = Array.isArray(res) ? res : res?.data || [];
        setMilestones(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMilestones();
  }, []);
  const openMilestones = milestones?.filter((m) => m.is_open === true) || [];
  const currentMilestone = openMilestones[0];
  console.log("CURRENT MILESTONE:", currentMilestone);
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
            <strong>Upload Task</strong>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "green", fontSize: "18px" }}>✔️</span>
              <span>Your task has been submitted successfully</span>
            </div>
          </div>
        ),
        {
          duration: 3000,
        },
      );
      setShowPopup(false);
      setFile(null);
      setNotes("");
      setMilestoneId("");
    } catch (error) {
      console.log("ERROR CAUGHT:", error);
      toast.error(
        () => (
          <div>
            <strong>Upload Failed</strong>
            <div>{error?.message}</div>
          </div>
        ),
        { duration: 3000 },
      );
    }
  };
  return (
    <div className="flex items-center student-navbar justify-between px-8 py-3 bg-white ">
      {/* Left */}
      <div className="nav-left">
        <img src={logo} alt="logo" width="60" />
      </div>
      <div className="nav-center">
        <span
          className={`nav-link ${isActive("/") ? "activ-link" : ""}`}
          onClick={() => navigate("/")}
        >
          Home
        </span>

        <span
          className={`nav-link ${location.pathname.startsWith("/projectsLiberary") ? "activ-link" : ""}`}
          onClick={() => navigate("/projectsLiberary")}
        >
          Library
        </span>
        {currentUser && (
          <span
            className={`nav-link ${isActive("/team") ? "activ-link" : ""}`}
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
          className={`nav-link ${isActive("/timeline") ? "activ-link" : ""}`}
          onClick={() =>
            navigate(
              currentUser?.has_team ? "student/inteam/timeline" : "/timeline",
            )
          }
        >
          Timeline
        </span>
      </div>
      <div className="nav-right">
        {isLibraryPage ? (
          currentUser && (
            <button
              className="favorite-btn-navbar"
              onClick={() => navigate("/projectsLiberary/favorites")}
            >
              <FaHeart />
              Favorites
            </button>
          )
        ) : (
          <button
            onClick={() => currentUser && setShowPopup(true)}
            className={`upload-btn ${!currentUser ? "upload-btn-disabled" : ""}`}
            disabled={!currentUser}
          >
            <FiUpload />
            Upload Task
          </button>
        )}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>Upload Task</h2>
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
              />
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
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => currentUser && navigate("/profile")}
        >
          {currentUser ? (
            <>
              <img
                src="https://i.pravatar.cc/40"
                className="w-8 h-8 rounded-full"
                alt="Profile"
              />
              <span className="text-sm">{currentUser.full_name}</span>
              <MdExpandMore />
            </>
          ) : (
            <>
              <FaUserCircle size={32} color="#BDBDBD" />
              <span className="text-sm text-gray-400">Guest</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
