import React, { useEffect, useState } from "react";
import Student from "../services/Student.model"; 
import { FaTimes, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import "./NotificationsPage.css";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // all | unread | read
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  // جلب الإشعارات عند تحميل الصفحة
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await Student.getNotifications();
      setNotifications(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // تصفية الإشعارات بناءً على الـ Tab المفتوح
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "unread") return notif.read_at === null;
    if (activeTab === "read") return notif.read_at !== null;
    return true; 
  });

  // تنسيق الوقت
  const formatTime = (dateString) => {
    if (!dateString) return "Last Wednesday at 9:42 AM"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // تحديد الأيقونة بناءً على نوع الإشعار
  const renderNotificationIcon = (notif) => {
    if (notif.data?.type === "rejected" || notif.type?.includes("Rejected")) {
      return <div className="notif-icon-circle bg-gray-100"><FaTimes className="text-red-500" /></div>;
    }
    if (notif.data?.type === "failed" || notif.type?.includes("failed")) {
      return <div className="notif-icon-circle bg-gray-100"><FaExclamationTriangle className="text-red-500" /></div>;
    }
    if (notif.data?.avatar) {
      return <img src={notif.data.avatar} alt="avatar" className="notif-avatar" />;
    }
    return <div className="notif-icon-circle bg-gray-100"><span className="text-gray-400">⚡</span></div>;
  };

  return (
    <div className="notifications-page-container">
      
      {/* 1. حاوية العنوان والسهم أصبحت بالخارج تماماً فوق الكارد الأبيض */}
      <div className="page-title-container">
        <FaArrowLeft 
          className="back-to-home-icon" 
          onClick={() => navigate("/")} 
          title="Back to Home"
        />
        <h2 className="page-title">Notifications</h2>
      </div>

      {/* 2. الكارد الأبيض الرئيسي للإشعارات */}
      <div className="notifications-card">
        
        {/* Tabs Controls */}
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <span className="divider">|</span>
          <button
            className={`tab-btn ${activeTab === "unread" ? "active" : ""}`}
            onClick={() => setActiveTab("unread")}
          >
            Unread
          </button>
          <span className="divider">|</span>
          <button
            className={`tab-btn ${activeTab === "read" ? "active" : ""}`}
            onClick={() => setActiveTab("read")}
          >
            Read
          </button>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading notifications...</div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No notifications found.</div>
          ) : (
            filteredNotifications.map((notif) => (
              <div key={notif.id} className={`notif-item ${notif.read_at === null ? "unread-bg" : ""}`}>
                
                {/* Left: Icon or Avatar */}
                <div className="notif-left">
                  {renderNotificationIcon(notif)}
                </div>

                {/* Right: Content */}
                <div className="notif-content">
                  <div className="notif-text-wrapper">
                    <span className="notif-message">
                      {notif.data?.message || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
                    </span>
                    
                    {notif.data?.department && (
                      <span className="notif-dept">({notif.data.department})</span>
                    )}

                    {notif.data?.type === "rejected" && (
                      <FaTimes className="inline-block text-red-500 ml-2" />
                    )}
                  </div>

                  {notif.data?.action_required && (
                    <div className="notif-actions-btns">
                      <button className="btn-accept-notif">Accept</button>
                      <button className="btn-reject-notif">Reject</button>
                    </div>
                  )}

                  <div className="notif-time">{formatTime(notif.created_at)}</div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;