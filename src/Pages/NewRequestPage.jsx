import "./NewRequestPage.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Requests from "../Services/Requests.model";
import Student from "../Services/Student.model";
import Supervision from "../Services/Requests.model";

function NewRequestPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSupervision = location.pathname.includes("supervision/new-requests");

  /* ================= STATES ================= */
  const [students, setStudents] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [tas, setTas] = useState([]);
  const [activeTab, setActiveTab] = useState("doctors");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sendingId, setSendingId] = useState(null);
  const [sentRequests, setSentRequests] = useState({});

  /* ================= FETCH ================= */
  useEffect(() => {
    if (isSupervision) {
      fetchSupervisors();
    } else {
      fetchStudents();
    }
  }, [isSupervision]);

  const fetchStudents = async () => {
    try {
      const response = await Student.getAvailableStudents();
      setStudents(response?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const response = await Supervision.getAvailableSupervisors();
      setDoctors(response?.doctors || []);
      setTas(response?.tas || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEND REQUEST ================= */
  const handleSendRequest = async (item) => {
    try {
      setSendingId(item.id);

      let response;

      if (isSupervision) {
        const data = {
          supervisor_id: item.id,
          role: item.role,
        };
        response = await Supervision.sendsupervisionrequests(data);
      } else {
        const data = { to_user_id: item.id, request_type: "team_form" };
        response = await Requests.sendRequest(data);
      }

      console.log(response);

      setSentRequests((prev) => ({
        ...prev,
        [item.id]: response?.status || response?.data?.status || "pending",
      }));
    } catch (error) {
      console.log(error);
      alert("Failed To Send Request");
    } finally {
      setSendingId(null);
    }
  };

  /* ================= FILTER (تحديث الفلتر للبحث بالاسم، التراك، أو الوظيفة) ================= */
  const currentList = isSupervision
    ? activeTab === "doctors"
      ? doctors
      : tas
    : students;

  const filteredList = currentList.filter((item) => {
    const name = item?.name?.toLowerCase() || "";
    const track = item?.track?.toLowerCase() || "";
    const role = item?.role?.toLowerCase() || "";
    const query = search.toLowerCase();

    return name.includes(query) || track.includes(query) || role.includes(query);
  });

  /* ================= RENDER USERS ================= */
  const renderUsers = () => {
    if (loading) return <p className="loading-text">Loading...</p>;

    if (filteredList.length === 0)
      return (
        <div className="empty-state">
          No Available{" "}
          {isSupervision
            ? activeTab === "doctors"
              ? "Doctors"
              : "Assistants"
            : "Students"}
        </div>
      );

    return filteredList.map((item) => (
      <div className="user-item" key={item.id}>
        <div className="user-info">
          <img
            src={
              item.profile_image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={item.name}
          />
          <div>
            <h4>{item.name}</h4>
            <p>{item.track || item.role}</p>
          </div>
        </div>

        <div className="user-actions">
          {sentRequests[item.id] === "pending" ? (
            <button className="pending-btn">Pending</button>
          ) : (
            <button
              className="send-btn"
              disabled={sendingId === item.id}
              onClick={() => handleSendRequest(item)}
            >
              {sendingId === item.id ? "Sending..." : "Send"}
            </button>
          )}
        </div>
      </div>
    ));
  };

  /* ================= JSX ================= */
  return (
    <div className="new-requests-page">
      {/* HEADER */}
      <div className="new-header">
        <div className="header-left">
          <IoArrowBack className="back-icon" onClick={() => navigate(-1)} />
          <h2>New Requests</h2>
        </div>
      </div>

      {/* CARD */}
      <div className="new-card">
        {/* SEARCH */}
        <div className="search-row">
          <div className="search-boxe">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, track or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <HiOutlineAdjustmentsHorizontal />
          </button>
        </div>

        {/* TABS */}
        {isSupervision && (
          <div className="tabs-row">
            <button
              className={`tab-btn ${activeTab === "doctors" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("doctors");
                setSearch("");
              }}
            >
              Doctors
            </button>
            <button
              className={`tab-btn ${activeTab === "tas" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("tas");
                setSearch("");
              }}
            >
              Assistants
            </button>
          </div>
        )}

          {/* USERS */}
          <div className="users-list">{renderUsers()}</div>
        </div>
      </div>
    );
  }

export default NewRequestPage;