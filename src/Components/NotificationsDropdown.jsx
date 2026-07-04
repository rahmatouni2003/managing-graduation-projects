import "./NotificationsDropdown.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. استيراد useNavigate
import Student from "../services/Student.model";
import { FaBell, FaTimesCircle } from "react-icons/fa";

const TABS = ["All", "Unread", "Read"];

function NotificationsDropdown() {
  const navigate = useNavigate(); // 2. تعريف الـ navigate
  
  const [activeTab, setActiveTab] = useState("All");
  const [requests, setRequests] = useState({}); // { [id]: "accepted" | "rejected" }
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    const refresh = () => {
      getNotifications();
    };

    window.addEventListener("refresh-notifications", refresh);

    return () => {
      window.removeEventListener("refresh-notifications", refresh);
    };
  }, []);

  const getNotifications = async () => {
    try {
      setLoading(true);
      const res = await Student.getNotifications();
      console.log(res);

      const formatted = res.map((item) => ({
        id: item.id,
        status: item.read_at ? "read" : "unread",
        type: item.type,
        name: item.data.from_user_name || "",
        message: item.data.message,
        time: item.created_at,
        icon: item.data.icon,
        color: item.data.color,
        avatar: item.data.from_user_name
          ? `https://i.pravatar.cc/40?u=${item.data.from_user_id}`
          : null,
        hasActions:
          item.type === "new_request" &&
          item.data.request_type === "team_form",
        requestId: item.data.request_id,
        teamId: item.data.team_id,
      }));

      setNotifications(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === "All") return true;
    if (activeTab === "Unread") return n.status === "unread";
    if (activeTab === "Read") return n.status === "read";
    return true;
  });

  const handleAccept = (id) =>
    setRequests((prev) => ({ ...prev, [id]: "accepted" }));
  const handleReject = (id) =>
    setRequests((prev) => ({ ...prev, [id]: "rejected" }));

  const renderAvatar = (notif) => {
    if (notif.avatar) {
      return (
        <img
          src={notif.avatar}
          alt={notif.name}
          className="notif-avatar-img"
        />
      );
    }

    switch (notif.icon) {
      case "bell":
        return <FaBell />;
      case "x-circle":
        return <FaTimesCircle color="red" />;
      default:
        return <FaBell />;
    }
  };

  return (
    <div className="notif-dropdown">
      {/* Title */}
      <h3 className="notif-title">Notifications</h3>

      {/* Tabs */}
      <div className="notif-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`notif-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="notif-list">
        {loading ? (
          <p className="notif-empty">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="notif-empty">No notifications</p>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif.id}
              className={`notif-item ${notif.status === "unread" ? "unread" : ""}`}
            >
              {/* Avatar */}
              <div className="notif-avatar">{renderAvatar(notif)}</div>

              {/* Content */}
              <div className="notif-content">
                {notif.name && (
                  <p className="notif-text">
                    <strong>{notif.name} </strong>
                    {notif.message}
                  </p>
                )}

                {!notif.name && <p className="notif-text">{notif.message}</p>}

                {/* Accept / Reject */}
                {notif.hasActions && !requests[notif.id] && (
                  <div className="notif-actions">
                    <button
                      className="notif-accept"
                      onClick={() => handleAccept(notif.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="notif-reject"
                      onClick={() => handleReject(notif.id)}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {requests[notif.id] && (
                  <span className={`notif-status-label ${requests[notif.id]}`}>
                    {requests[notif.id] === "accepted"
                      ? "✔ Accepted"
                      : "✘ Rejected"}
                  </span>
                )}

                <p className="notif-time">{notif.time}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="notif-footer">
        {/* 3. إضافة الـ onClick هنا للتوجيه */}
        <button 
          className="notif-see-all" 
          onClick={() => navigate("/student/notifications")}
        >
          See All Notifications
        </button>
      </div>
    </div>
  );
}

export default NotificationsDropdown;