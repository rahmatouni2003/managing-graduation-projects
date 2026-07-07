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

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // flag محلي يتقفل لو الـ effect اتغير (يعني المستخدم نقل صفحة)
    let isActive = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = isSupervisionMode
          ? await Requests.getSupervisorRequests()
          : await Requests.getSentRequests();

        // لو الـ effect ده لسه هو الأحدث (يعني لسه في نفس الصفحة)
        if (isActive) {
          setSentRequests(response.data);
        }
        // لو isActive = false يعني المستخدم غيّر الصفحة قبل ما الرد يوصل
        // فبنتجاهل الرد ده تماماً ومبنعملهوش setState
      } catch (error) {
        if (isActive) {
          console.log(error);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // cleanup function - بتشتغل أول ما الـ effect يتغير أو الكومبونينت يتشال
    return () => {
      isActive = false;
    };
  }, [isSupervisionMode, location.pathname]);

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
          <IoArrowBack
            className="back-icon"
            onClick={() => navigate("/inteam/team")}
          />
          <h2>Requests</h2>
        </div>

        {/* التعديل هنا: التبديل الشرطي للرابط بناءً على حالة الصفحة الحالية */}
        <button
          className="send-request-btn"
          onClick={() =>
            navigate(
              isSupervisionMode
                ? "/student/inteam/supervision/new-requests"
                : "/student/inteam/new-request"
            )
          }
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
            onClick={() => navigate("/student/inteam/sent-requests")}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <p style={{ textAlign: "center", color: "#888" }}>No requests found.</p>
          ) : (
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