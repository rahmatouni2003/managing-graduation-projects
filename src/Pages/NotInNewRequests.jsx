import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // تم إضافة useLocation هنا
import toast, { Toaster } from "react-hot-toast";
import Student from "../Services/Student.model";
import Requests from "../Services/Requests.model";
import "./NotInNewRequests.css";

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Avatar({ name, image }) {
  if (image) {
    return <img src={image} alt={name} className="nrAvatarImg" />;
  }
  const initial = name ? name.trim().charAt(0).toUpperCase() : "?";
  return <div className="nrAvatarFallback">{initial}</div>;
}

const TABS = [
  { key: "students", label: "Students" },
  { key: "teams", label: "Teams" },
];

export default function NotInNewRequests() {
  const navigate = useNavigate();
  const location = useLocation(); // تم تعريف الـ location لقراءة الـ state المرسلة

  // التعديل الأساسي: جعل التابة النشطة تعتمد على القيمة المرسلة من الصفحة السابقة كأولوية
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "students");
  const [search, setSearch] = useState("");

  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]); // لتخزين بيانات الفرق
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تتبع الطلبات المرسلة في الجلسة الحالية للفرق والطلاب
  const [sentIds, setSentIds] = useState(new Set());
  const [sendingId, setSendingId] = useState(null);

  useEffect(() => {
    setSearch(""); // تصفية البحث عند تغيير التبويب
    if (activeTab === "students") {
      fetchStudents();
    } else if (activeTab === "teams") {
      fetchTeams();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await Student.getAvailableStudents();
      const list = res?.data ?? res?.data ?? [];
      setStudents(Array.isArray(list) ? list : []);
    } catch {
      setError("Failed to load students. Please try again.");
      toast.error("Failed to load students. Please try again.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await Requests.getAvailableTeams();
      const list = res?.data?? res?.data ?? [];
      setTeams(Array.isArray(list) ? list : []);
    } catch {
      setError("Failed to load teams. Please try again.");
      toast.error("Failed to load teams. Please try again.");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (id, type) => {
    if (sentIds.has(id) || sendingId === id) return;
    setSendingId(id);
    try {
      await Requests.sendRequest({
        to_user_id: id, 
        request_type: type === "team" ? "team_join" : "team_form",
      });
      setSentIds((prev) => new Set(prev).add(id));
      toast.success(
        type === "team" ? "Request sent to the team." : "Request sent successfully."
      );
    } catch {
      setError("Failed to send request. Please try again.");
      toast.error("Failed to send request. Please try again.");
    } finally {
      setSendingId(null);
    }
  };

  // فلترة الطلاب بناءً على البحث
  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.track?.toLowerCase().includes(q)
    );
  }, [students, search]);

  // فلترة الفرق بناءً على أسماء الأعضاء أو الـ Track داخل الفرق
  const filteredTeams = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter((team) =>
      team.members?.some(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.track?.toLowerCase().includes(q)
      )
    );
  }, [teams, search]);

  return (
    <div className="nrPage">
      <Toaster position="top-center" />

      <div className="nrHeader">
        <button className="nrBackBtn" aria-label="Back" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <h1 className="nrTitle">New Requests</h1>
      </div>

      <div className="nrCard">
        <div className="nrTopRow">
          <div className="nrSearchWrapper">
            <span className="nrSearchIcon">
              <SearchIcon />
            </span>
            <input
              className="nrSearchInput"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="nrFilterBtn" aria-label="Filter">
            <FilterIcon />
          </button>
        </div>

        <div className="nrTabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`nrTabBtn ${activeTab === t.key ? "nrTabBtnActive" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="nrList">
          {/* تبويب الطلاب */}
          {activeTab === "students" && (
            <>
              {loading && <p className="nrStateText">Loading students...</p>}
              {error && <p className="nrStateText">{error}</p>}
              {!loading && !error && filteredStudents.length === 0 && (
                <p className="nrStateText">No students found.</p>
              )}

              {!loading && !error && filteredStudents.map((student) => {
                const isSent = sentIds.has(student.id) || !student.can_request;
                const isSending = sendingId === student.id;
                return (
                  <div key={student.id} className="nrRow">
                    <div className="nrMember">
                      <Avatar name={student.name} image={student.profile_image} />
                      <div className="nrMemberInfo">
                        <span className="nrMemberName">{student.name}</span>
                        <span className="nrMemberTrack">{student.track || "—"}</span>
                      </div>
                    </div>

                    <button
                      className={`nrSendBtn ${isSent ? "nrSendBtnDisabled" : ""}`}
                      disabled={isSent || isSending}
                      onClick={() => handleSendRequest(student.id, "student")}
                    >
                      {isSending ? "Sending..." : isSent ? "Sent" : "Send"}
                    </button>
                  </div>
                );
              })}
            </>
          )}

          {/* تبويب الفرق */}
          {activeTab === "teams" && (
            <>
              {loading && <p className="nrStateText">Loading teams...</p>}
              {error && <p className="nrStateText">{error}</p>}
              {!loading && !error && filteredTeams.length === 0 && (
                <p className="nrStateText">No teams found.</p>
              )}

              {!loading && !error && filteredTeams.map((team) => {
                const isSent = sentIds.has(team.id) || !team.can_request;
                const isSending = sendingId === team.id;
                return (
                  <div key={team.id} className="nrTeamBox">
                    <div className="nrTeamContent">
                      <div className="nrTeamCount">
                        {team.current_members} of {team.max_members} members
                      </div>
                      
                      <div className="nrTeamMembersGrid">
                        {team.members?.map((member) => (
                          <div key={member.id} className="nrTeamMemberCard">
                            <Avatar name={member.name} image={member.profile_image} />
                            <span className="nrTeamMemberName" title={member.name}>
                              {member.name}
                            </span>
                            <span className="nrTeamMemberTrack">
                              {member.track || "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      className={`nrTeamActionBtn ${isSent ? "nrTeamActionBtnDisabled" : ""}`}
                      disabled={isSent || isSending}
                      onClick={() => handleSendRequest(team.id, "team")}
                    >
                      {isSending ? "Sending..." : isSent ? "Request Sent" : "Request to Join"}
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}