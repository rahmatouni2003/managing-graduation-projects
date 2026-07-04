import "./SentRequestsPage.css";

import { useEffect, useState } from "react";

import { IoArrowBack } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

import { useNavigate, useLocation } from "react-router-dom";

import Requests from "../Services/Requests.model";

function SentRequestsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // هنتحقق هل احنا في صفحة supervision/requests
  const isSupervisionMode = location.pathname.includes("supervision/requests");

  const activeTab = "sent";

  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. स्टेट (State) الخاصة بنص البحث
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isSupervisionMode) {
      fetchSupervisorRequests();
    } else {
      fetchSentRequests();
    }
  }, [isSupervisionMode]);

  const fetchSentRequests = async () => {
    try {
      setLoading(true);
      const response = await Requests.getSentRequests();
      setSentRequests(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSupervisorRequests = async () => {
    try {
      setLoading(true);
      const response = await Requests.getSupervisorRequests();
      setSentRequests(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const filteredRequests = sentRequests.filter((item) => {
    const name = item.to_user?.name?.toLowerCase() || "";
    const track = item.to_user?.track?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return name.includes(query) || track.includes(query);
  });
  return (
    <div className="sent-page">
      {/* HEADER */}
      <div className="sent-header">
        <div className="sent-header-left">
          <IoArrowBack className="back-icon"
          onClick={() => navigate("/inteam/team")}
          />
          <h2>Requests</h2>
        </div>

        <button className="send-request-btn"
           onClick={() => navigate("/student/inteam/supervision/new-requests")}
        >
          Send New Requests
        </button>
      </div>
      {!isSupervisionMode && (
        <div className="sent-tabs">
          <button
            className={activeTab === "received" ? "sent-tab active-tab" : "sent-tab"}
            onClick={() => navigate("/student/inteam/received")}
          >
            Received
          </button>

          <button
            className={activeTab === "sent" ? "sent-tab active-tab" : "sent-tab"}
            onClick={() => navigate("/sent-requests")}
          >
            Sent
          </button>
        </div>
      )}

      {/* CARD */}
      <div className="sent-card">

        {/* SEARCH */}
        <div className="sent-search-row">
          <div className="sent-search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or track..."
              value={searchQuery} // ربط قيمة المدخل بالـ State
              onChange={(e) => setSearchQuery(e.target.value)} // تحديث الـ State عند الكتابة
            />
          </div>

          <button className="filter-btn">
            <HiOutlineAdjustmentsHorizontal />
          </button>
        </div>

        {/* LIST */}
        <div className="sent-list">
          {loading ? (
            <p>Loading...</p>
          ) : filteredRequests.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>No requests found.</p> // رسالة في حال عدم وجود نتائج
          ) : (
            // هنا بنعرض المصفوفة المفلترة (filteredRequests) وليس المصفوفة الأصلية
            filteredRequests.map((item) => (
              <div className="sent-item" key={item.id}>
                <div className="sent-user">
                  <img
                    src={item.to_user?.profile_image || "https://i.pravatar.cc/150"}
                    alt=""
                  />
                  <div>
                    <h4>{item.to_user?.name}</h4>
                    <p>{item.to_user?.track}</p>
                  </div>
                </div>

                <div
                  className={
                    item.status === "accepted"
                      ? "status accepted"
                      : item.status === "rejected"
                      ? "status declined"
                      : "status"
                  }
                >
                  {item.status === "accepted"
                    ? "Accepted"
                    : item.status === "rejected"
                    ? "Declined"
                    : "Pending"}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default SentRequestsPage;